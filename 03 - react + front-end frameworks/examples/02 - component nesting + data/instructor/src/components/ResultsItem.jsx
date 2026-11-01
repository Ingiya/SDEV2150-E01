export default function ResultsItem({
  title,
  category,
  summary,
  location,
  children,
}) {
	// NOTE: we don't get access to a {key} prop even if we set one when the component is used;
	//       the key is just for React's internal bookkeeping.

	return <li
		className="w-full text-left px-4 py-3 text-gray-900 hover:bg-gray-50"
	>
		<div className="flex items-start justify-between gap-3">
			<h2 className="text-sm font-semibold">{title}</h2>
			<small className="text-xs text-gray-500">{category}</small>
		</div>
    {children}

		<p className="mt-1 text-xs text-gray-500">{summary}</p>
		<small className="mt-1 block text-xs text-gray-500">
			{location}
		</small>
	</li>
}
