/* eslint-disable @typescript-eslint/no-throw-literal */

export async function convertMp3ToWav(mp3File: File): Promise<File> {
  return await new Promise((resolve, reject) => {
    const audioContext = new window.AudioContext();
    const reader = new FileReader();

    reader.readAsArrayBuffer(mp3File);

    reader.onload = async () => {
      try {
        // Decode MP3 to AudioBuffer
        const audioBuffer = await audioContext.decodeAudioData(
          reader.result as ArrayBuffer
        );

        // Convert to WAV
        const wavBuffer = encodeWav(audioBuffer);

        // Create WAV File
        const wavFile = new File([wavBuffer], 'converted.wav', {
          type: 'audio/wav'
        });

        console.log('Converted WAV File:', wavFile);
        resolve(wavFile);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = error => {
      reject(error);
    };
  });
}

// ✅ Helper function to encode WAV
function encodeWav(audioBuffer: AudioBuffer): ArrayBuffer {
  const sampleRate = audioBuffer.sampleRate;
  const numChannels = audioBuffer.numberOfChannels;
  const length = audioBuffer.length * numChannels * 2 + 44;
  const buffer = new ArrayBuffer(length);
  const view = new DataView(buffer);

  // WAV Header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, length - 8, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * 2, true);
  view.setUint16(32, numChannels * 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, length - 44, true);

  // Write PCM audio
  const interleaved = interleave(audioBuffer);
  floatTo16BitPCM(view, 44, interleaved);

  return buffer;
}

// ✅ Helper function to write WAV header
function writeString(view: DataView, offset: number, str: string): void {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

// ✅ Helper function to interleave audio channels
function interleave(audioBuffer: AudioBuffer): Float32Array {
  const numChannels = audioBuffer.numberOfChannels;
  const length = audioBuffer.length * numChannels;
  const result = new Float32Array(length);
  let offset = 0;

  for (let i = 0; i < audioBuffer.length; i++) {
    for (let j = 0; j < numChannels; j++) {
      result[offset++] = audioBuffer.getChannelData(j)[i];
    }
  }
  return result;
}

// ✅ Helper function to convert Float32 PCM to 16-bit PCM
function floatTo16BitPCM(
  view: DataView,
  offset: number,
  input: Float32Array
): void {
  for (let i = 0; i < input.length; i++, offset += 2) {
    const sample = Math.max(-1, Math.min(1, input[i]));
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
  }
}
