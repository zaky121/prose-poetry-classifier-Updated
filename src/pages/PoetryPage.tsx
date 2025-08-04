import React, { useState } from 'react';
import { Feather, User, Calendar, Heart, Share2, Play, Pause } from 'lucide-react';

interface Poem {
  id: number;
  title: string;
  poet: string;
  bio: string;
  date: string;
  verses: string[];
  category: string;
  likes: number;
  recitations: number;
  description: string;
}

const PoetryPage: React.FC = () => {
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [selectedPoet, setSelectedPoet] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState(false);

  const poems: Poem[] = [
    {
      id: 1,
      title: "Somaliyeey Toosoo",
      poet: "Abwaan Maxamed Ibraahim Warsame 'Hadraawi'",
      bio: "Abwaan Hadraawi waa mid ka mid ah gabayaaga ugu caansan Soomaaliya. Wuxuu ku dhashay 1943 Burco, wuxuuna caan ku yahay gabayada jacaylka iyo midnimada.",
      date: "1965",
      verses: [
        "Somaliyeey toosoo, toosoo isku tiirsada",
        "Hadba kiina kala tagoo, kala dareersada",
        "Waa laga soo horjeedaa, laguna soo halgamaa",
        "Hadba kiina kala baxoo, kala jeexjeexsada",
        "",
        "Somaliyeey toosoo, toosoo wadajirtada",
        "Hadba kiina kala tagoo, kala dareersada",
        "Waa laga soo horjeedaa, laguna soo halgamaa",
        "Hadba kiina kala baxoo, kala jeexjeexsada"
      ],
      category: "midnimo",
      likes: 892,
      recitations: 1543,
      description: "Gabaygan wuxuu ka hadlayaa midnimada Soomaaliyeed iyo baahida loo qabo in dadka Soomaaliyeed ay isku tiirsan yihiin."
    },
    {
      id: 2,
      title: "Jacayl",
      poet: "Abwaan Maxamed Ibraahim Warsame 'Hadraawi'",
      bio: "Abwaan Hadraawi waa mid ka mid ah gabayaaga ugu caansan Soomaaliya. Wuxuu ku dhashay 1943 Burco, wuxuuna caan ku yahay gabayada jacaylka iyo midnimada.",
      date: "1970",
      verses: [
        "Jacaylku waa jahawareer, joogto ma leh",
        "Waa jilib aan la joogin, jidh ma leh",
        "Waa jirrid aan la arkin, joog ma leh",
        "Waa jaceyl aan dhammayn, jir ma leh",
        "",
        "Laakiin wuxuu leeyahay, jawi kulul",
        "Wuxuu leeyahay jirro, jecel ah",
        "Wuxuu leeyahay jidhka, jacayl ah",
        "Wuxuu leeyahay joogga, jaceyl ah"
      ],
      category: "jacayl",
      likes: 654,
      recitations: 987,
      description: "Gabay qurux badan oo ka hadlaya dareenka jacaylka iyo sida uu u saameeyaa qofka."
    },
    {
      id: 3,
      title: "Dardaaran",
      poet: "Abwaan Cabdillaahi Suldaan 'Timacade'",
      bio: "Abwaan Timacade (1920-1973) waa gabayaa caan ah oo ku dhashay Luuq. Wuxuu caan ku yahay gabayada dardaaranka ah iyo kuwa bulshada wax bara.",
      date: "1960",
      verses: [
        "Dadkaygiiyow dardaaran, waa laga dareemaa",
        "Duruufaha nagu haya, waa laga dulqaadaa",
        "Dalkayaga hooyo ah, waa laga difaacaa",
        "Danaha guud ee ummadda, waa laga doodaa",
        "",
        "Diinta iyo dhaqankeenna, waa laga dhawraa",
        "Dadnimada iyo sharafta, waa laga dhiibaa",
        "Dhibaatada naga haysata, waa laga dhaqaaqaa",
        "Danab iyo horumar, waa laga doonaa"
      ],
      category: "dardaaran",
      likes: 445,
      recitations: 723,
      description: "Gabay dardaaran ah oo ka hadlaya masuuliyadda dadka Soomaaliyeed ee ku aadan dalkooda iyo dhaqankooda."
    },
    {
      id: 4,
      title: "Hooyo",
      poet: "Abwaan Maxamed Xaashi Dhamac 'Gaarriye'",
      bio: "Abwaan Gaarriye (1949-2012) waa gabayaa caan ah oo ku dhashay Hargeysa. Wuxuu caan ku yahay gabayada qoyska iyo bulshada.",
      date: "1985",
      verses: [
        "Hooyoy hooyoy, hooyo macaan",
        "Halkay tahay jacaylkaaga, hiil iyo naxariis",
        "Haddaan ku maqlo codkaaga, waan hurdo wanaagsan",
        "Haddaan arko wejigaaga, waan helaa farxad",
        "",
        "Hooyoy gacantaada, waa mid i hagaajisa",
        "Hooyoy hadalkaga, waa mid i hanjabaaya",
        "Hooyoy jacaylkaaga, waa mid i hiiliya",
        "Hooyoy naxariiskaaga, waa mid i hagaajiya"
      ],
      category: "qoys",
      likes: 756,
      recitations: 1234,
      description: "Gabay qurux badan oo ku saabsan hooyo iyo muhiimadda ay u leedahay carruurta."
    },
    {
      id: 5,
      title: "Barwaaqo",
      poet: "Abwaan Cabdillaahi Suldaan 'Timacade'",
      bio: "Abwaan Timacade (1920-1973) waa gabayaa caan ah oo ku dhashay Luuq. Wuxuu caan ku yahay gabayada dardaaranka ah iyo kuwa bulshada wax bara.",
      date: "1965",
      verses: [
        "Barwaaqadu waa barakad, Ilaah bixiyaa",
        "Beeraha iyo xoolaha, waa laga bartaa",
        "Bulshada oo dhammi, way ka faa'iidaysaa",
        "Baahida dadka ah, way ka buuxsantaa",
        "",
        "Laakiin barwaaqada, waa in la ilaaliyaa",
        "Waa in aan la israf baahin, laguna baajin",
        "Waa in dadka danyarta ah, loo baahiyaa",
        "Waa in bulshada oo dhan, ay ka faa'iidaysaa"
      ],
      category: "barwaaqo",
      likes: 389,
      recitations: 567,
      description: "Gabay ka hadlaya barwaaqada iyo sida loo isticmaalo si wanaagsan."
    },
    {
      id: 6,
      title: "Nabadda",
      poet: "Abwaan Maxamed Xaashi Dhamac 'Gaarriye'",
      bio: "Abwaan Gaarriye (1949-2012) waa gabayaa caan ah oo ku dhashay Hargeysa. Wuxuu caan ku yahay gabayada qoyska iyo bulshada.",
      date: "1990",
      verses: [
        "Nabaddu waa naxariis, Ilaah noo siiyaa",
        "Waa nuur iftiimiya, nafta dadka ah",
        "Waa nolol wanaagsan, aan niyad jabka lahayn",
        "Waa nidaam bulshada, ku nool tahay",
        "",
        "Nabadda la'aanteed, dadku ma noolaan karo",
        "Nabadda la'aanteed, wax ma kobci karo",
        "Nabadda la'aanteed, mustaqbal ma jiro",
        "Nabadda ayaa ah, naftayada ugu muhiimsan"
      ],
      category: "nabadda",
      likes: 623,
      recitations: 891,
      description: "Gabay qurux badan oo ka hadlaya muhiimadda nabadda iyo saamaynta ay ku leedahay bulshada."
    }
  ];

  const poets = [
    { id: 'all', name: 'Dhammaan Gabayaaga', count: poems.length },
    { id: 'hadraawi', name: 'Abwaan Hadraawi', count: poems.filter(p => p.poet.includes('Hadraawi')).length },
    { id: 'timacade', name: 'Abwaan Timacade', count: poems.filter(p => p.poet.includes('Timacade')).length },
    { id: 'gaarriye', name: 'Abwaan Gaarriye', count: poems.filter(p => p.poet.includes('Gaarriye')).length }
  ];

  const categories = [
    { id: 'midnimo', name: 'Midnimo', color: 'from-blue-500 to-indigo-600' },
    { id: 'jacayl', name: 'Jacayl', color: 'from-pink-500 to-rose-600' },
    { id: 'dardaaran', name: 'Dardaaran', color: 'from-orange-500 to-red-600' },
    { id: 'qoys', name: 'Qoys', color: 'from-green-500 to-emerald-600' },
    { id: 'barwaaqo', name: 'Barwaaqo', color: 'from-yellow-500 to-orange-600' },
    { id: 'nabadda', name: 'Nabadda', color: 'from-purple-500 to-violet-600' }
  ];

  const filteredPoems = selectedPoet === 'all' 
    ? poems 
    : poems.filter(poem => {
        if (selectedPoet === 'hadraawi') return poem.poet.includes('Hadraawi');
        if (selectedPoet === 'timacade') return poem.poet.includes('Timacade');
        if (selectedPoet === 'gaarriye') return poem.poet.includes('Gaarriye');
        return true;
      });

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : 'from-gray-500 to-gray-600';
  };

  const getCategoryName = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.name : category;
  };

  if (selectedPoem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setSelectedPoem(null)}
            className="mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-white transition-all duration-200"
          >
            ← Dib u noqo
          </button>
          
          <article className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            <header className="mb-8">
              <div className="mb-4">
                <span className={`inline-block px-4 py-2 bg-gradient-to-r ${getCategoryColor(selectedPoem.category)} rounded-full text-white text-sm font-medium`}>
                  {getCategoryName(selectedPoem.category)}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                {selectedPoem.title}
              </h1>
              
              <div className="bg-gradient-to-r from-violet-500/20 to-pink-500/20 rounded-xl p-6 mb-6 border border-violet-500/30">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-violet-500 to-pink-500">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{selectedPoem.poet}</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedPoem.bio}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedPoem.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>{selectedPoem.likes} jecel</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>{selectedPoem.recitations} dhegaysi</span>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed text-lg mb-8 bg-black/20 rounded-xl p-6">
                {selectedPoem.description}
              </p>
            </header>
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Gabayga</h2>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 rounded-lg text-white transition-all duration-200"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Joogso' : 'Dhegayso'}</span>
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-black/30 to-black/20 rounded-2xl p-8 border border-white/10">
                {selectedPoem.verses.map((verse, index) => (
                  <div key={index} className="mb-4">
                    {verse === '' ? (
                      <div className="h-6"></div>
                    ) : (
                      <p className="text-xl text-gray-200 leading-relaxed font-serif text-center">
                        {verse}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <footer className="pt-6 border-t border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-300 transition-all duration-200">
                    <Heart className="w-4 h-4" />
                    <span>Jecel</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-300 transition-all duration-200">
                    <Share2 className="w-4 h-4" />
                    <span>Wadaag</span>
                  </button>
                </div>
              </div>
            </footer>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <div className="p-4 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 shadow-2xl">
              <Feather className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent mb-4">
            Gabay Soomaali
          </h1>
          <p className="text-xxl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Ku raaxayso gabayada iyo maansada gabayaaga caanka ah ee Soomaaliyeed
          </p>
        </div>

        {/* Poet Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {poets.map((poet) => (
            <button
              key={poet.id}
              onClick={() => setSelectedPoet(poet.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedPoet === poet.id
                  ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white backdrop-blur-sm border border-white/20'
              }`}
            >
              {poet.name} ({poet.count})
            </button>
          ))}
        </div>

        {/* Poems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPoems.map((poem) => (
            <div
              key={poem.id}
              className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedPoem(poem)}
            >
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 bg-gradient-to-r ${getCategoryColor(poem.category)} rounded-full text-white text-sm font-medium`}>
                  {getCategoryName(poem.category)}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                {poem.title}
              </h3>
              
              <div className="mb-4">
                <p className="text-gray-300 font-medium mb-2">{poem.poet}</p>
                <p className="text-gray-400 text-sm line-clamp-2">{poem.description}</p>
              </div>
              
              <div className="bg-gradient-to-br from-black/30 to-black/20 rounded-lg p-4 mb-4 border border-white/10">
                <div className="text-center">
                  {poem.verses.slice(0, 4).map((verse, index) => (
                    <p key={index} className="text-gray-300 text-sm leading-relaxed font-serif mb-1">
                      {verse || ''}
                    </p>
                  ))}
                  {poem.verses.length > 4 && (
                    <p className="text-gray-500 text-xs mt-2">...</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{poem.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Play className="w-4 h-4" />
                    <span>{poem.recitations}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{poem.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PoetryPage;