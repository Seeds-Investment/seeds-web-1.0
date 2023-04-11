export default function BgSection4({
  children
}: {
  children: React.ReactElement;
}): React.ReactElement {
  const circleSize = { height: '350px', width: '350px' };
  return (
    <div className="relative min-h-screen min-w-full">
      <div className="flex min-w-full min-h-screen flex-col justify-between overflow-hidden absolute">
        <div className="w-full h-full justify-center flex opacity-70"></div>
        <div className="opacity-70">
          <div
            className="rounded-full bg-seeds-purple blur-[120px] -ml-14 -mb-28"
            style={circleSize}
          />
          <div
            className="rounded-full bg-seeds-green blur-[120px] ml-36 -mb-32"
            style={circleSize}
          />
        </div>
      </div>
      {children}
    </div>
  );
}
