const EarningDetailSkeleton = (): JSX.Element => {
	return (
		<div className="w-full flex flex-col items-center animate-pulse gap-6">
			<div className="w-[200px] h-[150px] bg-gray-200 rounded-lg" />
			<div className="w-40 h-5 bg-gray-200 rounded" />
			<div className="w-3/4 h-4 bg-gray-200 rounded" />
			<div className="w-full md:w-[400px] flex flex-col gap-4 bg-[#F9F9F9] border border-[#E9E9E9] rounded-lg p-4 mt-8">
			<div className="flex justify-between items-center">
					<div className="w-24 h-4 bg-gray-200 rounded" />
					<div className="w-20 h-4 bg-gray-200 rounded" />
			</div>
			<div className="flex justify-between items-center">
					<div className="w-24 h-4 bg-gray-200 rounded" />
					<div className="w-28 h-4 bg-gray-200 rounded" />
			</div>
			<div className="flex justify-between items-center">
					<div className="w-24 h-4 bg-gray-200 rounded" />
					<div className="w-36 h-4 bg-gray-200 rounded" />
			</div>
			<div className="flex justify-between items-center">
					<div className="w-24 h-4 bg-gray-200 rounded" />
					<div className="w-28 h-4 bg-gray-200 rounded" />
			</div>
			</div>
			<div className="w-[200px] md:w-[350px] h-10 bg-gray-200 rounded-full mt-6" />
		</div>
	)
}

export default EarningDetailSkeleton