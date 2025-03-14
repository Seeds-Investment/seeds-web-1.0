/**
 * MP3 to WAV converter helper
 * Simplified version that processes a single audio file
 */

/**
 * Convert an audio file to WAV format
 * @param audioFile - The audio file to convert
 * @param options - Conversion options
 * @returns Promise resolving to a Blob containing the WAV file
 */
export async function convertAudioToWav(
  audioFile: File,
  options: {
    sampleRate?: number;
    bitDepth?: 8 | 16;
    channels?: 'both' | 'left' | 'right' | 'mix';
  } = {}
): Promise<Blob> {
  // Set default options
  const sampleRate = options.sampleRate ?? 4100;
  const bytesPerSample = options.bitDepth === 8 ? 1 : 2;
  const channelOpt = options.channels ?? 'both';

  try {
    // Decode the audio file
    const arrayBuffer = await audioFile.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Process the audio (resample, reduce channels, normalize)
    const processedBuffer = await processAudioFile(
      audioBuffer,
      channelOpt,
      sampleRate
    );

    // Convert to raw wave data
    const rawData = audioToRawWave(
      channelOpt === 'both' && processedBuffer.numberOfChannels > 1
        ? [processedBuffer.getChannelData(0), processedBuffer.getChannelData(1)]
        : [processedBuffer.getChannelData(0)],
      bytesPerSample
    );

    // Create WAV file
    return makeWav(
      rawData,
      channelOpt === 'both' && processedBuffer.numberOfChannels > 1 ? 2 : 1,
      sampleRate,
      bytesPerSample
    );
  } catch (error) {
    console.error(`Error converting file ${audioFile.name}:`, error);
    throw new Error(
      `Failed to convert audio file: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Save a blob as a file
 * @param blob - The blob to save
 * @param fileName - The name to save the file as
 */
export function saveAudioFile(blob: Blob, fileName: string): void {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, 1000);
}

/* --- Audio processing functions --- */

const audioResample = async (
  buffer: AudioBuffer,
  sampleRate: number
): Promise<AudioBuffer> => {
  const offlineCtx = new OfflineAudioContext(
    buffer.numberOfChannels,
    (buffer.length / buffer.sampleRate) * sampleRate,
    sampleRate
  );
  const source = offlineCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(offlineCtx.destination);
  source.start();
  return await offlineCtx.startRendering();
};

const audioReduceChannels = (
  buffer: AudioBuffer,
  targetChannelOpt: 'both' | 'left' | 'right' | 'mix'
): AudioBuffer => {
  // If we want both channels or there's only one channel, return the buffer as is
  if (targetChannelOpt === 'both' || buffer.numberOfChannels < 2) return buffer;

  // Create a new buffer with a single channel
  const outBuffer = new AudioBuffer({
    sampleRate: buffer.sampleRate,
    length: buffer.length,
    numberOfChannels: 1
  });

  // Get the channel data
  const data = [buffer.getChannelData(0), buffer.getChannelData(1)];
  const newData = new Float32Array(buffer.length);

  // Process based on the selected channel option
  for (let i = 0; i < buffer.length; ++i) {
    newData[i] =
      targetChannelOpt === 'left'
        ? data[0][i]
        : targetChannelOpt === 'right'
        ? data[1][i]
        : (data[0][i] + data[1][i]) / 2; // 'mix'
  }

  outBuffer.copyToChannel(newData, 0);
  return outBuffer;
};

const audioNormalize = (buffer: AudioBuffer): AudioBuffer => {
  // Get all channel data
  const data = Array.from(Array(buffer.numberOfChannels)).map((_, idx) =>
    buffer.getChannelData(idx)
  );

  // Find the maximum amplitude across all channels
  const maxAmplitude = Math.max(
    ...data.map(chan =>
      chan.reduce((acc, cur) => Math.max(acc, Math.abs(cur)), 0)
    )
  );

  // If already normalized, return as is
  if (maxAmplitude >= 1.0) return buffer;

  // Normalize all channels
  const coeff = 1.0 / maxAmplitude;
  data.forEach((chan, channelIndex) => {
    for (let i = 0; i < chan.length; i++) {
      chan[i] = chan[i] * coeff;
    }
    buffer.copyToChannel(chan, channelIndex);
  });

  return buffer;
};

const processAudioFile = async (
  audioBufferIn: AudioBuffer,
  targetChannelOpt: 'both' | 'left' | 'right' | 'mix',
  targetSampleRate: number
): Promise<AudioBuffer> => {
  // Step 1: Resample to target sample rate
  const resampled = await audioResample(audioBufferIn, targetSampleRate);

  // Step 2: Reduce channels if needed
  const reduced = audioReduceChannels(resampled, targetChannelOpt);

  // Step 3: Normalize audio levels
  const normalized = audioNormalize(reduced);

  return normalized;
};

const audioToRawWave = (
  audioChannels: Float32Array[],
  bytesPerSample: 1 | 2
): Uint8Array => {
  const bufferLength = audioChannels[0].length;
  const numberOfChannels = audioChannels.length;
  const reducedData = new Uint8Array(
    bufferLength * numberOfChannels * bytesPerSample
  );

  for (let i = 0; i < bufferLength; ++i) {
    for (let channel = 0; channel < numberOfChannels; ++channel) {
      const outputIndex = (i * numberOfChannels + channel) * bytesPerSample;
      let sample = audioChannels[channel][i];

      // Prevent clipping
      sample = sample > 1 ? 1 : sample < -1 ? -1 : sample;

      // Convert to appropriate bit depth
      switch (bytesPerSample) {
        case 2: // 16-bit
          sample = sample * 32767;
          reducedData[outputIndex] = sample & 0xff;
          reducedData[outputIndex + 1] = (sample >> 8) & 0xff;
          break;
        case 1: // 8-bit
          reducedData[outputIndex] = (sample + 1) * 127;
          break;
        default:
          throw new Error('Only 8 and 16 bits per sample are supported');
      }
    }
  }

  return reducedData;
};

const makeWav = (
  data: Uint8Array,
  channels: 1 | 2,
  sampleRate: number,
  bytesPerSample: 1 | 2
): Blob => {
  const headerLength = 44;
  const wav = new Uint8Array(headerLength + data.length);
  const view = new DataView(wav.buffer);

  // RIFF identifier 'RIFF'
  view.setUint32(0, 0x52494646, false);

  // File length minus RIFF identifier length and file description length
  view.setUint32(4, 36 + data.length, true);

  // RIFF type 'WAVE'
  view.setUint32(8, 0x57415645, false);

  // Format chunk identifier 'fmt '
  view.setUint32(12, 0x666d7420, false);

  // Format chunk length
  view.setUint32(16, 16, true);

  // Sample format (raw)
  view.setUint16(20, 1, true);

  // Channel count
  view.setUint16(22, channels, true);

  // Sample rate
  view.setUint32(24, sampleRate, true);

  // Byte rate (sample rate * block align)
  view.setUint32(28, sampleRate * bytesPerSample * channels, true);

  // Block align (channel count * bytes per sample)
  view.setUint16(32, bytesPerSample * channels, true);

  // Bits per sample
  view.setUint16(34, bytesPerSample * 8, true);

  // Data chunk identifier 'data'
  view.setUint32(36, 0x64617461, false);

  // Data chunk length
  view.setUint32(40, data.length, true);

  // Copy audio data
  wav.set(data, headerLength);

  return new Blob([wav.buffer], { type: 'audio/wav' });
};
