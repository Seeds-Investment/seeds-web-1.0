import { memo } from 'react';

const MorePowerUpButton: React.FC = () => {
  const darkBackgroundDisabled = '#BDBDBD';
  const backgroundDisabled = '#E9E9E9';

  return (
    <div
      className="rounded-xl mb-3 w-full h-[53px] cursor-pointer hover:opacity-80"
      style={{
        backgroundColor: darkBackgroundDisabled
      }}
    >
      <div
        className="rounded-xl mb-3 w-full h-[46px] flex justify-between items-center px-4"
        style={{
          backgroundColor: backgroundDisabled
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="rounded-full h-7 w-7 flex justify-center items-center text-base text-white font-bold"
            style={{
              backgroundColor: '#7C7C7C'
            }}
          >
            +1
          </div>
          <span
            className="text-base text-white font-bold"
            style={{ color: darkBackgroundDisabled }}
          >
            POWER UP
          </span>
        </div>

        {/* 
        <View
              style={[
                Layout.round,
                Layout.rowHCenter,
                Gutters.regularHPadding,
                {
                  backgroundColor: isSelected
                    ? Colors.sunOrange
                    : darkBackgroundDisabled,
                  borderColor: isSelected
                    ? Colors.goldenYellow
                    : Colors.neutral[400],
                  borderWidth: 3,
                  paddingVertical: 2,
                },
              ]}>
              <Text color={Colors.white} size={'sm'}>
                {price}
              </Text>
            </View>
        */}
        <div
          className="rounded-full flex justify-center text-white py-1 px-3 text-sm"
          style={{
            backgroundColor: darkBackgroundDisabled,
            border: '2px solid',
            borderColor: '#7C7C7C'
          }}
        >
          <span>IDR 5,000</span>
        </div>
      </div>
    </div>
  );
};

export default memo(MorePowerUpButton);
