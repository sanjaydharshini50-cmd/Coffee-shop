import { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { MENU_ITEMS } from '../data/coffeeData';
import { MenuItem, Category } from '../types/coffee';
import { CoffeeArt } from './CoffeeArt';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export function MenuSection({ onSelectItem, onQuickAdd }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'popular' | 'decaf'>('all');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.origin && item.origin.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.notes && item.notes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())));

      let matchesDiet = true;
      if (dietaryFilter === 'popular') matchesDiet = !!item.popular;
      if (dietaryFilter === 'decaf') matchesDiet = item.caffeine === 'Decaf';

      return matchesCat && matchesSearch && matchesDiet;
    });
  }, [selectedCategory, searchQuery, dietaryFilter]);

  return (
    <section id="menu" className="py-16 md:py-24 bg-[#FAF8F5] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#966742] mb-2">
              <span>Counter & Bar Menu</span>
              <span aria-hidden="true">·</span>
              <span>Made Fresh to Order</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E140D] font-normal tracking-tight [text-wrap:balance]">
              Espresso, Slow Filters & Artisanal Bakery
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8C7665] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drinks, origin, notes..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-[#DCD3C5] rounded-lg focus:outline-none focus:border-[#221711] text-[#20150E] placeholder:text-[#9C897B]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7665] hover:text-[#20150E]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs (Segmented Controls) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#EAE3D6]">
          {/* Main Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F0EBE2] rounded-lg overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Offerings' },
              { id: 'espresso', label: 'Espresso Bar' },
              { id: 'pourover', label: 'Pour Over & Filter' },
              { id: 'specialties', label: 'Signature Iced & Tonics' },
              { id: 'bakery', label: 'Artisanal Bakery' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as Category)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  selectedCategory === tab.id
                    ? 'bg-white text-[#20150E] shadow-xs'
                    : 'text-[#6B5A4D] hover:text-[#20150E]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sub Filters (Popular, Decaf) */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#8C7A6D]">Filter:</span>
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                dietaryFilter === 'all'
                  ? 'font-semibold text-[#20150E] underline underline-offset-4 decoration-1 decoration-[#C28E5C]'
                  : 'text-[#7A675A] hover:text-[#20150E]'
              }`}
            >
              All
            </button>
            <span aria-hidden="true" className="text-[#C4B4A4]">·</span>
            <button
              onClick={() => setDietaryFilter('popular')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                dietaryFilter === 'popular'
                  ? 'font-semibold text-[#20150E] underline underline-offset-4 decoration-1 decoration-[#C28E5C]'
                  : 'text-[#7A675A] hover:text-[#20150E]'
              }`}
            >
              House Favorites
            </button>
            <span aria-hidden="true" className="text-[#C4B4A4]">·</span>
            <button
              onClick={() => setDietaryFilter('decaf')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                dietaryFilter === 'decaf'
                  ? 'font-semibold text-[#20150E] underline underline-offset-4 decoration-1 decoration-[#C28E5C]'
                  : 'text-[#7A675A] hover:text-[#20150E]'
              }`}
            >
              Caffeine-Free
            </button>
          </div>
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-xl border border-[#E5DDD0]">
            <p className="font-serif text-lg text-[#20150E]">No items match your selection</p>
            <p className="text-xs text-[#7A675A] mt-1">Try clearing your search query or changing category.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#20150E] border border-[#D5C9B8] rounded-md hover:bg-[#FAF8F5]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-xl border border-[#E7DFD2] overflow-hidden hover:border-[#C49257] hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Visual Image container */}
                <div 
                  onClick={() => onSelectItem(item)}
                  className="h-48 w-full relative cursor-pointer overflow-hidden border-b border-[#EAE3D6]"
                >
                  <CoffeeArt type={item.artType} />
                  
                  {/* Subtle Unboxed indicator if popular */}
                  {item.popular && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#FAF8F5]/90 backdrop-blur-xs border border-[#DFD6C7] rounded text-[11px] font-medium text-[#7C4927]">
                      Barista Pick
                    </div>
                  )}

                  {/* Roast or Dietary text */}
                  {item.roastLevel && (
                    <div className="absolute top-3 right-3 text-[11px] text-[#7A675A] bg-[#FAF8F5]/90 backdrop-blur-xs px-2 py-0.5 rounded border border-[#DFD6C7]">
                      {item.roastLevel} Roast
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed 1-line metadata kicker */}
                    {item.origin && (
                      <p className="text-[11px] uppercase tracking-wider text-[#966742] font-medium truncate mb-1">
                        {item.origin}
                      </p>
                    )}

                    <h3 
                      onClick={() => onSelectItem(item)}
                      className="font-serif text-lg font-medium text-[#20150E] group-hover:text-[#7A4B29] transition-colors cursor-pointer"
                    >
                      {item.name}
                    </h3>

                    <p className="text-xs text-[#5F4E42] mt-1.5 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Tasting notes */}
                    {item.notes && item.notes.length > 0 && (
                      <div className="mt-3 text-[11px] text-[#7A675A] flex flex-wrap items-center gap-1.5">
                        <span className="font-medium text-[#8C6239]">Notes:</span>
                        <span>{item.notes.join(' · ')}</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Row: Price + Order CTA */}
                  <div className="mt-5 pt-4 border-t border-[#F2ECE3] flex items-center justify-between">
                    <div>
                      <span className="font-mono tabular-nums text-base font-semibold text-[#20150E]">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.customizable && (
                        <span className="block text-[10px] text-[#8C7A6D]">Customizable</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {item.customizable ? (
                        <button
                          onClick={() => onSelectItem(item)}
                          className="px-3 py-1.5 text-xs font-semibold text-[#20150E] bg-[#FAF8F5] border border-[#D5C9B8] hover:bg-[#F3ECE0] rounded-md transition-colors whitespace-nowrap"
                        >
                          Customize
                        </button>
                      ) : null}

                      <button
                        onClick={() => onQuickAdd(item)}
                        aria-label={`Quick add ${item.name}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#FFFDF9] bg-[#221711] hover:bg-[#3D291D] rounded-md transition-colors whitespace-nowrap"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#E6C59E]" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
