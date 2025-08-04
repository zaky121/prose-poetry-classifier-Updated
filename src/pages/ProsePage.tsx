import React, { useState } from 'react';
import { BookOpen, Calendar, User, Eye, Heart, Share2 } from 'lucide-react';

interface ProseArticle {
  id: number;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  likes: number;
  views: number;
}

const ProsePage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<ProseArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const proseArticles: ProseArticle[] = [
    {
      id: 1,
      title: "Dhaqanka Soomaaliyeed iyo Casriga Maanta",
      author: "Dr. Maxamed Cabdi Gahayr",
      date: "2024-01-15",
      excerpt: "Dhaqanka Soomaaliyeed waa mid qani ah oo leh taariikh dheer. Wuxuu ka kooban yahay caadooyin, dhaqammo, iyo hab-nololeed gaar ah...",
      content: `Dhaqanka Soomaaliyeed waa mid qani ah oo leh taariikh dheer. Wuxuu ka kooban yahay caadooyin, dhaqammo, iyo hab-nololeed gaar ah oo ka duwan kuwa dadyowga kale ee dunida.

Dhaqankan wuxuu ku dhisan yahay qiyam muhiim ah sida: karaamo, sharaf, walaaltinimo, iyo ixtiraam. Dadka Soomaaliyeed waxay caan ku yihiin martiqaadkooda, deeqsintooda, iyo sida ay ugu dhaqmaan martida.

Suugaanta Soomaaliyeed, gaar ahaan gabayada, waa qayb muhiim ah oo ka mid ah dhaqankan. Gabaygu wuxuu ahaa hab lagu dhaxliyo aqoonta, taariikhda, iyo xigmadda jiilka hore. Wuxuu sidoo kale ahaa hab lagu xalliyo khilaafaadka iyo lagu horumarinayo bulshada.

Maanta, dhaqankan ayaa la kulma caqabado badan oo ka yimid casriga cusub iyo saamaynta dhaqammada kale. Laakiin dadka Soomaaliyeed waxay dadaal u galayaan in ay ilaaliyaan dhaxalkooda dhaqameed iyagoo ku daraya waxyaabo cusub oo waafaqsan wakhtiga maanta.

Waxaa muhiim ah in aan ilaalino dhaqankeenna asalka ah, laakiin sidoo kale in aan aqbalno isbeddellada wanaagsan ee keeni kara horumar bulshadeenna. Dhaqanku waa wax nool oo isbeddela, laakiin aasaaskiisu waa in uu ahaado mid xooggan oo aan la waayicin.`,
      category: "dhaqan",
      readTime: "8 daqiiqo",
      likes: 245,
      views: 1520
    },
    {
      id: 2,
      title: "Taariikhda Magaalada Muqdisho",
      author: "Cabdiraxmaan Maxamed Nuur",
      date: "2024-01-10",
      excerpt: "Muqdisho, caasimadda Soomaaliya, waa magaalo leh taariikh aad u qoto dheer. Waxay ahayd xarun muhiim ah oo ganacsiga Badda Cas...",
      content: `Muqdisho, caasimadda Soomaaliya, waa magaalo leh taariikh aad u qoto dheer. Waxay ahayd xarun muhiim ah oo ganacsiga Badda Cas iyo Gacanka Cadmeed.

Magaaladan waxaa dhisay qarnigii 10aad dadka Soomaaliyeed iyo ganacsatada Carabta. Waxay noqotay magaalo caan ah oo caalamka oo dhan laga yaqaan sababtoo ah meesha ganacsiga iyo waxbarashada.

Qarnigii 13aad iyo 14aad, Muqdisho waxay ahayd mid ka mid ah magaalooyinka ugu waaweyn ee Afrika Bari. Waxay lahayd dekeddo waaweyn, suuqyo ballaaran, iyo macaahid caan ah oo waxbarasho laga heli jiray.

Ibn Battuta, socdaalkii caan ahaa, ayaa booqday Muqdisho 1331kii. Wuxuu ku tilmaamay inay tahay "magaalo aad u weyn oo ay ku nool yihiin dad badan." Wuxuu sidoo kale sheegay in dadka halkaas deggan ay ahaayeen kuwo ganacsato ah oo ay leeyihiin dhaqaale wanaagsan.

Maanta, Muqdisho waxay ku dadaalaysaa inay dib ugu soo laabato heerkeeda hore. In kasta oo ay la kulantay dhibaatooyin badan, dadka magaalada deggan waxay muujinayaan adkaysi iyo rajada mustaqbalka.

Dhismayaasha qadiimiga ah ee Muqdisho, sida Masjidka Fakhr ad-Din iyo qalcadaha qadiimiga ah, waxay ka sheekeeyaan taariikh qani ah oo mudan in la ilaaliyo oo la dhaxliyo jiilka soo socda.`,
      category: "taariikh",
      readTime: "12 daqiiqo",
      likes: 189,
      views: 987
    },
    {
      id: 3,
      title: "Horumarinta Waxbarashada Soomaaliya",
      author: "Maryan Axmed Cali",
      date: "2024-01-05",
      excerpt: "Waxbarashaddu waa furaha horumarinta kasta. Soomaaliya waxay u baahan tahay nidaam waxbarasho oo casri ah oo ku habboon...",
      content: `Waxbarashaddu waa furaha horumarinta kasta. Soomaaliya waxay u baahan tahay nidaam waxbarasho oo casri ah oo ku habboon baahiyaha wakhtiga maanta.

Taariikhda waxbarashada Soomaaliya waxay bilaabatay dugsiyada Quraanka iyo macaahidka diinta. Kuwaas waxay door muhiim ah ka ciyaareen dhaxalka aqoonta iyo dhaqanka Soomaaliyeed.

Xilligii gumeysiga, waxbarashadda rasmiga ah waxay bilaabatay dugsiyada Talyaaniga iyo Ingiriiska. Laakiin taasi waxay ahayd mid xaddidan oo aan gaadhin dadka badankiisa.

Ka dib xornimada 1960kii, dawladda cusub waxay bilaabatay barnaamij ballaaran oo waxbarasho. Waxaa la dhisay dugsiyaal cusub, waxaana la hirgaliyay olole aqoon-yaqaan ah oo guul weyn gaadhay.

Maanta, Soomaaliya waxay la kulantaa caqabado badan oo saamaynaya waxbarashada. Dagaalladii sokeeye, daadka dadka, iyo yarida khayraadka waxay keeneen hoos u dhac weyn.

Si loo xalliyo dhibaatooyinkan, waxaa loo baahan yahay:
- Maalgashi ballaaran oo waxbarasho
- Tababar macallimiinta
- Dhisme dugsiyaal cusub
- Isticmaalka tignoolajiyada casriga ah
- Wadashaqayn caalamiga ah

Mustaqbalka waxbarashada Soomaaliya wuxuu ku xiran yahay dadaalka aan wada galayno maanta. Waa in aan dhisno nidaam waxbarasho oo tayada leh oo diyaarinaya jiilka mustaqbalka.`,
      category: "waxbarasho",
      readTime: "10 daqiiqo",
      likes: 156,
      views: 743
    },
    {
      id: 4,
      title: "Dhaqaalaha Soomaaliya iyo Fursadaha Maalgashiga",
      author: "Eng. Faarax Maxamed Xasan",
      date: "2023-12-28",
      excerpt: "Soomaaliya waxay leedahay fursado badan oo maalgashi ah oo aan weli la isticmaalin. Dalka wuxuu leeyahay khayraado dabiici ah...",
      content: `Soomaaliya waxay leedahay fursado badan oo maalgashi ah oo aan weli la isticmaalin. Dalka wuxuu leeyahay khayraado dabiici ah, xeeb dheer, iyo dad shaqaale ah.

Warshadaha kalluunka waa mid ka mid ah deeqaha ugu weyn ee Soomaaliya. Xeebta dheer ee dalka iyo biyaha qaniga ah waxay siinayaan fursad weyn oo kalluun-soo-saarka ah.

Beeraha iyo xoolaha sidoo kale waa qaybo muhiim ah oo dhaqaalaha Soomaaliya. Dhulka beeraha ee qaniga ah iyo cimilada wanaagsan waxay u oggolaanayaan beerista dalagga kala duwan.

Macdanta iyo shidaalka waa khayraado aan weli la qodin. Cilmi-baadhisyo cusub waxay muujinayaan in Soomaaliya ay leedahay kaydyo weyn oo shidaal iyo macdan ah.

Ganacsiga iyo adeegyada sidoo kale waxay leeyihiin awood weyn oo kobcinta dhaqaalaha. Magaalooyinka waaweyn waxay noqon karaan xarumaha ganacsiga Geeska Afrika.

Si loo horumariyo dhaqaalaha, waxaa loo baahan yahay:
- Nabadgalyo iyo xasillooni
- Nidaam sharciyeed oo xooggan
- Kaabayaal asaasi ah (waddooyin, korontada, biyaha)
- Tababar shaqaalaha
- Maalgashi dibadda

Mustaqbalka dhaqaalaha Soomaaliya waa mid rajo leh haddii la sameeyo tallaabooyin saxda ah. Dadka Soomaaliyeed waxay leeyihiin kartida iyo rajada loo baahan yahay si loo dhiso dhaqaale xooggan.`,
      category: "dhaqaale",
      readTime: "15 daqiiqo",
      likes: 203,
      views: 1234
    }
  ];

  const categories = [
    { id: 'all', name: 'Dhammaan', count: proseArticles.length },
    { id: 'dhaqan', name: 'Dhaqan', count: proseArticles.filter(a => a.category === 'dhaqan').length },
    { id: 'taariikh', name: 'Taariikh', count: proseArticles.filter(a => a.category === 'taariikh').length },
    { id: 'waxbarasho', name: 'Waxbarasho', count: proseArticles.filter(a => a.category === 'waxbarasho').length },
    { id: 'dhaqaale', name: 'Dhaqaale', count: proseArticles.filter(a => a.category === 'dhaqaale').length }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? proseArticles 
    : proseArticles.filter(article => article.category === selectedCategory);

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setSelectedArticle(null)}
            className="mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-white transition-all duration-200"
          >
            ← Dib u noqo
          </button>
          
          <article className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                {selectedArticle.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{selectedArticle.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(selectedArticle.date).toLocaleDateString('so-SO')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{selectedArticle.views} daawasho</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>{selectedArticle.likes} jecel</span>
                </div>
              </div>
            </header>
            
            <div className="prose prose-lg prose-invert max-w-none">
              {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-200 leading-relaxed mb-6 text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <footer className="mt-8 pt-6 border-t border-white/20">
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
                <span className="text-sm text-gray-400">
                  Waqtiga akhriska: {selectedArticle.readTime}
                </span>
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
            <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-2xl">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent mb-4">
            Sheeko Soomaali
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Aqri maqaallada iyo qoraallada muhiimka ah ee suugaanta Soomaaliyeed
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white backdrop-blur-sm border border-white/20'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full text-blue-300 text-sm font-medium border border-blue-500/30">
                  {categories.find(c => c.id === article.category)?.name}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <span>{article.readTime}</span>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{article.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{article.likes}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(article.date).toLocaleDateString('so-SO')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProsePage;