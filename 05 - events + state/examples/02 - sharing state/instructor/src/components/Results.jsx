import { useState } from 'react';

import ResultsItem from './ResultsItem';
import { resources } from '../data/resources';
import Card from './ui/Card';

export default function Results({
  selectedResource,
  onSelectResource,
  searchTerm,
  selectedCategories,
  openNowOnly
}) {

  return (
    <Card title="Results">
      <ul className="divide-y divide-gray-200">
        {resources.filter((r) => {
          // I want to match *all of*: search, category, open now
          const matchesSearch = r.title.toLowerCase().includes(
            searchTerm.toLowerCase()
          )
          // Refresher on filters using or-chains: First thing I check is whether filter is unused,
          // then (if used) I go matching for values.
          const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(r.category)
          const matchesOpenNow = !openNowOnly || r.openNow

          // At the end of the day, the callback in a filter should just
          // return true/false for items that match
          return matchesSearch && matchesCategory && matchesOpenNow
        })
          .map((r) => (          <ResultsItem
            key={r.id}
            title={r.title}
            category={r.category}
            summary={r.summary}
            location={r.location}
            onClick={() => onSelectResource(r)}
            selected={selectedResource?.id === r.id}
          >
            {/* children: optional badge content */}
            {r.openNow && (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                Open now
              </span>
            )}
          </ResultsItem>
        ))}
      </ul>
    </Card >
  );
}