interface ArtProps {
  type: 'latte' | 'pourover' | 'espresso' | 'coldbrew' | 'pastry' | 'beans' | 'roaster' | 'chemex';
  className?: string;
}

export function CoffeeArt({ type, className = "w-full h-full" }: ArtProps) {
  switch (type) {
    case 'latte':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-br from-[#F5EFE6] via-[#EFE6D8] to-[#E3D4C1] overflow-hidden ${className}`}>
          {/* Subtle ceramic cup shadow */}
          <div className="absolute w-44 h-44 rounded-full bg-[#1A120B]/10 blur-xl translate-y-3" />
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 max-w-[180px] drop-shadow-md" fill="none">
            {/* Saucer */}
            <ellipse cx="100" cy="148" rx="82" ry="34" fill="#E2DDD5" stroke="#CCC4B6" strokeWidth="2" />
            <ellipse cx="100" cy="146" rx="72" ry="28" fill="#ECE7DF" />
            
            {/* Cup Handle */}
            <path d="M 148 95 C 178 95 178 128 144 135" stroke="#D7D0C4" strokeWidth="12" strokeLinecap="round" fill="none" />
            
            {/* Cup Outer Body */}
            <path d="M 52 82 C 54 134 72 144 100 144 C 128 144 146 134 148 82 Z" fill="#F4EFEA" stroke="#DDD6CB" strokeWidth="2" />
            {/* Cup Rim */}
            <ellipse cx="100" cy="82" rx="48" ry="18" fill="#E4DDD2" stroke="#D3CBC0" strokeWidth="1.5" />
            {/* Coffee Liquid / Crema */}
            <ellipse cx="100" cy="82" rx="43" ry="15" fill="#3A2416" />
            {/* Golden Crema Ring */}
            <ellipse cx="100" cy="82" rx="41" ry="13.5" fill="#693B1F" opacity="0.85" />
            <ellipse cx="100" cy="82" rx="38" ry="12" fill="#884C27" opacity="0.9" />

            {/* Steamed Milk Rosetta / Heart Pattern */}
            <path d="M 100 75 C 92 70 85 75 88 80 C 91 85 100 89 100 90 C 100 89 109 85 112 80 C 115 75 108 70 100 75 Z" fill="#FFFBF5" opacity="0.95" />
            <path d="M 100 78 C 94 74 90 77 92 81 C 94 84 100 87 100 88 C 100 87 106 84 108 81 C 110 77 106 74 100 78 Z" fill="#FBF5EB" opacity="0.9" />
            <path d="M 100 70 L 100 92" stroke="#773E1E" strokeWidth="1" strokeLinecap="round" />
            <circle cx="100" cy="74" r="2.5" fill="#FFFBF5" />
          </svg>
        </div>
      );

    case 'pourover':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-br from-[#F4EFEB] via-[#EAE1D6] to-[#DCD0C0] overflow-hidden ${className}`}>
          <div className="absolute w-40 h-40 rounded-full bg-[#3B271B]/10 blur-xl translate-y-4" />
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 max-w-[180px] drop-shadow-md" fill="none">
            {/* Glass Carafe Bottom */}
            <path d="M 72 120 C 66 142 64 162 76 166 C 88 170 112 170 124 166 C 136 162 134 142 128 120 Z" fill="#EAF1F5" opacity="0.6" stroke="#C4D1D9" strokeWidth="2" />
            
            {/* Amber Brew Level */}
            <path d="M 75 138 C 73 148 72 158 82 163 C 92 167 108 167 118 163 C 128 158 127 148 125 138 Z" fill="#8E481D" opacity="0.85" />
            <ellipse cx="100" cy="138" rx="25" ry="4" fill="#B35F26" opacity="0.95" />

            {/* Carafe Neck */}
            <rect x="88" y="112" width="24" height="12" rx="2" fill="#EAF1F5" opacity="0.7" stroke="#C4D1D9" strokeWidth="1.5" />
            
            {/* Glass Handle */}
            <path d="M 126 128 C 146 132 146 156 123 158" stroke="#BFCCD4" strokeWidth="4.5" strokeLinecap="round" fill="none" />

            {/* Ceramic Dripper (V60) */}
            <path d="M 64 54 L 88 108 L 112 108 L 136 54 Z" fill="#F8F6F2" stroke="#D7CEBE" strokeWidth="2" />
            <ellipse cx="100" cy="54" rx="36" ry="9" fill="#EAE3D6" stroke="#D7CEBE" strokeWidth="2" />

            {/* Coffee Filter Paper */}
            <path d="M 70 56 L 90 98 L 110 98 L 130 56 Z" fill="#F0E5D3" />
            {/* Ground Coffee Bed Blooming */}
            <ellipse cx="100" cy="74" rx="20" ry="7" fill="#3D2314" />
            <circle cx="100" cy="73" r="1.5" fill="#8B4F2A" />
            <circle cx="94" cy="75" r="1.2" fill="#8B4F2A" />
            <circle cx="106" cy="74" r="1.2" fill="#8B4F2A" />

            {/* Delicate Rising Steam lines */}
            <path d="M 96 42 C 94 36 98 32 96 24" stroke="#9C897B" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 3" opacity="0.7" />
            <path d="M 104 44 C 106 37 102 33 105 25" stroke="#9C897B" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 3" opacity="0.7" />
          </svg>
        </div>
      );

    case 'espresso':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-br from-[#F2ECE4] via-[#E8DECF] to-[#D8CCBB] overflow-hidden ${className}`}>
          <div className="absolute w-36 h-36 rounded-full bg-[#2B1B13]/15 blur-lg translate-y-2" />
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 max-w-[170px] drop-shadow-md" fill="none">
            {/* Heavy Terracotta Demitasse Saucer */}
            <ellipse cx="100" cy="144" rx="66" ry="22" fill="#E0D6C8" stroke="#C9BCAC" strokeWidth="2" />
            <ellipse cx="100" cy="142" rx="54" ry="16" fill="#EDE4D6" />

            {/* Thick Ceramic Cup */}
            <path d="M 132 104 C 152 104 152 122 130 126" stroke="#D3C7B6" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 68 92 C 70 130 84 138 100 138 C 116 138 130 130 132 92 Z" fill="#F7F3EC" stroke="#DDD2C1" strokeWidth="2" />
            <ellipse cx="100" cy="92" rx="32" ry="12" fill="#E8DEC\-B" stroke="#D3C5B1" strokeWidth="1.5" />

            {/* Dense Ristretto extraction with tiger-stripe crema */}
            <ellipse cx="100" cy="92" rx="28" ry="10" fill="#24140B" />
            <ellipse cx="100" cy="92" rx="26" ry="9" fill="#753C18" opacity="0.9" />
            <ellipse cx="98" cy="91" rx="20" ry="7" fill="#A8622E" opacity="0.85" />
            
            {/* Crema highlights */}
            <path d="M 88 90 Q 95 87 106 89" stroke="#E6A868" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
            <path d="M 92 93 Q 101 95 110 92" stroke="#E6A868" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
          </svg>
        </div>
      );

    case 'coldbrew':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-br from-[#EAE6DF] via-[#E0D8CB] to-[#D0C5B4] overflow-hidden ${className}`}>
          <div className="absolute w-36 h-36 rounded-full bg-[#1B120C]/15 blur-lg translate-y-3" />
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 max-w-[170px] drop-shadow-md" fill="none">
            {/* Condensation Coaster */}
            <ellipse cx="100" cy="162" rx="44" ry="14" fill="#C9BCAC" opacity="0.5" />

            {/* Tall Collins Glass */}
            <path d="M 76 60 L 80 156 C 80 160 88 162 100 162 C 112 162 120 160 120 156 L 124 60 Z" fill="#F2F7F9" opacity="0.5" stroke="#C4D4DC" strokeWidth="2" />
            
            {/* Deep Cold Brew Liquor */}
            <path d="M 78 78 L 81 154 C 81 158 88 160 100 160 C 112 160 119 158 119 154 L 122 78 Z" fill="#20130B" />
            <ellipse cx="100" cy="78" rx="22" ry="5" fill="#4B2815" />

            {/* Translucent Hand-Cut Ice Cubes */}
            <rect x="88" y="86" width="22" height="22" rx="3" fill="#EAF3F7" opacity="0.45" stroke="#ADC6D4" strokeWidth="1.2" transform="rotate(-6 99 97)" />
            <rect x="92" y="112" width="20" height="20" rx="3" fill="#EAF3F7" opacity="0.4" stroke="#ADC6D4" strokeWidth="1.2" transform="rotate(10 102 122)" />
            
            {/* Orange Peel Garnish rim */}
            <path d="M 116 54 C 122 56 124 64 121 72" stroke="#E67E22" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );

    case 'pastry':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-br from-[#F8F3EC] via-[#EFE6D8] to-[#E3D4C1] overflow-hidden ${className}`}>
          <div className="absolute w-44 h-44 rounded-full bg-[#7C481A]/10 blur-xl translate-y-3" />
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 max-w-[180px] drop-shadow-md" fill="none">
            {/* Stoneware Plate */}
            <ellipse cx="100" cy="132" rx="76" ry="32" fill="#E8E1D5" stroke="#D3C9BC" strokeWidth="2" />
            <ellipse cx="100" cy="130" rx="66" ry="26" fill="#F4EFE6" />

            {/* Golden Artisanal Croissant Layers */}
            {/* Shadow under croissant */}
            <ellipse cx="100" cy="130" rx="46" ry="16" fill="#805432" opacity="0.25" />
            
            {/* Crescent curved body */}
            <path d="M 52 124 C 62 98 84 88 100 88 C 116 88 138 98 148 124 C 134 132 118 136 100 136 C 82 136 66 132 52 124 Z" fill="#D48B3B" stroke="#B06A22" strokeWidth="1.5" />
            
            {/* Flaky Laminated Ridge Swells */}
            <path d="M 72 122 C 78 102 88 94 100 94 C 112 94 122 102 128 122" fill="#E29F4C" stroke="#B87326" strokeWidth="1.5" />
            <path d="M 84 120 C 88 106 94 100 100 100 C 106 100 112 106 116 120" fill="#EBB468" stroke="#C98433" strokeWidth="1.5" />
            
            {/* Toasted Flaked Almonds */}
            <ellipse cx="94" cy="98" rx="5" ry="2.5" fill="#F2DFB8" stroke="#AF7940" strokeWidth="0.8" transform="rotate(-20 94 98)" />
            <ellipse cx="108" cy="104" rx="5" ry="2.5" fill="#F2DFB8" stroke="#AF7940" strokeWidth="0.8" transform="rotate(35 108 104)" />
            <ellipse cx="88" cy="112" rx="4.5" ry="2.2" fill="#F2DFB8" stroke="#AF7940" strokeWidth="0.8" transform="rotate(10 88 112)" />
            <ellipse cx="114" cy="116" rx="4.5" ry="2.2" fill="#F2DFB8" stroke="#AF7940" strokeWidth="0.8" transform="rotate(-15 114 116)" />

            {/* Fine Powdered Sugar specks */}
            <circle cx="98" cy="108" r="1" fill="#FFFFFF" opacity="0.9" />
            <circle cx="104" cy="112" r="1" fill="#FFFFFF" opacity="0.9" />
            <circle cx="92" cy="118" r="1" fill="#FFFFFF" opacity="0.9" />
          </svg>
        </div>
      );

    case 'beans':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-br from-[#EFEAE2] via-[#E4DDD0] to-[#D5CABC] overflow-hidden ${className}`}>
          <div className="absolute w-40 h-40 rounded-full bg-[#1A110A]/15 blur-lg translate-y-3" />
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 max-w-[170px] drop-shadow-md" fill="none">
            {/* Kraft Bag Standing Silhouette */}
            <path d="M 68 50 L 132 50 L 140 156 L 60 156 Z" fill="#D3C0A7" stroke="#BAA58A" strokeWidth="2" />
            {/* Bag Top Fold & Valve */}
            <rect x="64" y="44" width="72" height="12" rx="3" fill="#BAA58A" />
            <circle cx="100" cy="72" r="4" fill="#695744" opacity="0.4" />
            
            {/* Minimalist Origin Label on Bag */}
            <rect x="74" y="86" width="52" height="52" rx="2" fill="#FAF7F2" stroke="#E4DDD0" strokeWidth="1" />
            <line x1="80" y1="96" x2="120" y2="96" stroke="#3A281E" strokeWidth="2" />
            <line x1="80" y1="104" x2="114" y2="104" stroke="#8A7768" strokeWidth="1.2" />
            <line x1="80" y1="110" x2="106" y2="110" stroke="#8A7768" strokeWidth="1.2" />
            <rect x="80" y="122" width="22" height="8" rx="1" fill="#3A281E" />

            {/* Roasted Coffee Beans scattered in front */}
            <ellipse cx="62" cy="158" rx="8" ry="5.5" fill="#3B2215" stroke="#26140A" strokeWidth="1" transform="rotate(-25 62 158)" />
            <path d="M 59 155 Q 63 158 65 161" stroke="#201007" strokeWidth="1" strokeLinecap="round" />

            <ellipse cx="78" cy="164" rx="7.5" ry="5" fill="#4B2C1C" stroke="#2E180E" strokeWidth="1" transform="rotate(35 78 164)" />
            <path d="M 75 163 Q 79 164 81 166" stroke="#251209" strokeWidth="1" strokeLinecap="round" />

            <ellipse cx="132" cy="162" rx="8" ry="5" fill="#382013" stroke="#221108" strokeWidth="1" transform="rotate(-40 132 162)" />
            <path d="M 129 160 Q 132 162 135 164" stroke="#1D0E06" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'chemex':
      return (
        <div className={`relative flex items-center justify-center bg-gradient-to-br from-[#F5EFE6] to-[#E5D7C5] overflow-hidden ${className}`}>
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 max-w-[170px]" fill="none">
            {/* Hourglass Chemex */}
            <path d="M 65 45 L 94 100 L 94 105 L 68 165 C 68 170 82 174 100 174 C 118 174 132 170 132 165 L 106 105 L 106 100 L 135 45 Z" fill="#F4F8FA" opacity="0.6" stroke="#C4D1D8" strokeWidth="2" />
            {/* Wooden Collar at waist */}
            <rect x="91" y="98" width="18" height="16" rx="2" fill="#A86C3E" stroke="#875127" strokeWidth="1.5" />
            <line x1="91" y1="106" x2="109" y2="106" stroke="#3E2413" strokeWidth="2" />
            {/* Coffee amber liquid */}
            <path d="M 72 152 C 76 168 88 170 100 170 C 112 170 124 168 128 152 Z" fill="#934D21" opacity="0.9" />
          </svg>
        </div>
      );

    case 'roaster':
    default:
      return (
        <div className={`relative flex items-center justify-center bg-[#2B1B13] overflow-hidden ${className}`}>
          <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 max-w-[180px]" fill="none">
            {/* Vintage Roaster Silhouette with copper trim */}
            <circle cx="100" cy="100" r="54" fill="#3D291D" stroke="#D4A373" strokeWidth="3" />
            <circle cx="100" cy="100" r="42" fill="#251710" stroke="#754825" strokeWidth="2" strokeDasharray="4 4" />
            {/* Turning arm */}
            <circle cx="100" cy="100" r="8" fill="#D4A373" />
            <line x1="100" y1="100" x2="132" y2="82" stroke="#D4A373" strokeWidth="3" strokeLinecap="round" />
            <line x1="100" y1="100" x2="68" y2="118" stroke="#D4A373" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      );
  }
}
