import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";

const IMG_ACTION = "https://cdn.poehali.dev/projects/368a17ac-0f37-4e3c-8610-4ddbd09728f8/files/94c54b9d-cdc2-45c5-94bc-a4973ab3da96.jpg";
const IMG_CARTOON = "https://cdn.poehali.dev/projects/368a17ac-0f37-4e3c-8610-4ddbd09728f8/files/b7f05aff-e988-47f9-92e2-1820aa069247.jpg";
const IMG_TV = "https://cdn.poehali.dev/projects/368a17ac-0f37-4e3c-8610-4ddbd09728f8/files/e7ded9d7-f56f-4327-bede-09b7ee352445.jpg";

type Section = "home" | "cartoons" | "movies" | "tv";

const MOVIES = [
  { id: 1, title: "Стражи Галактики", year: 2023, genre: "Экшн", rating: 8.7, img: IMG_ACTION, badge: "new", hd: true, type: "movies" },
  { id: 2, title: "Дюна: Часть вторая", year: 2024, genre: "Фантастика", rating: 9.1, img: IMG_TV, badge: "new", hd: true, type: "movies" },
  { id: 3, title: "Оппенгеймер", year: 2023, genre: "Драма", rating: 8.9, img: IMG_ACTION, badge: null, hd: true, type: "movies" },
  { id: 4, title: "Прошлые жизни", year: 2023, genre: "Мелодрама", rating: 8.1, img: IMG_CARTOON, badge: null, hd: false, type: "movies" },
  { id: 5, title: "Бедные-несчастные", year: 2023, genre: "Комедия", rating: 7.9, img: IMG_TV, badge: null, hd: true, type: "movies" },
  { id: 6, title: "Мастер и Маргарита", year: 2024, genre: "Мистика", rating: 8.4, img: IMG_ACTION, badge: "new", hd: true, type: "movies" },
];

const CARTOONS = [
  { id: 7, title: "Смешарики: Возрождение", year: 2024, genre: "Приключения", rating: 8.2, img: IMG_CARTOON, badge: "new", hd: true, type: "cartoons" },
  { id: 8, title: "Маша и Медведь", year: 2023, genre: "Комедия", rating: 8.8, img: IMG_ACTION, badge: null, hd: false, type: "cartoons" },
  { id: 9, title: "Фиксики: Большой секрет", year: 2023, genre: "Семейный", rating: 7.5, img: IMG_TV, badge: null, hd: true, type: "cartoons" },
  { id: 10, title: "Три богатыря", year: 2024, genre: "Приключения", rating: 7.9, img: IMG_CARTOON, badge: "new", hd: true, type: "cartoons" },
  { id: 11, title: "Лунтик. Новый сезон", year: 2024, genre: "Семейный", rating: 8.0, img: IMG_ACTION, badge: null, hd: false, type: "cartoons" },
  { id: 12, title: "Барбоскины", year: 2023, genre: "Комедия", rating: 7.6, img: IMG_TV, badge: null, hd: true, type: "cartoons" },
];

const TV_CHANNELS = [
  { id: 13, title: "Первый канал", genre: "Новости / Развлечения", rating: null, img: IMG_TV, live: true, type: "tv" },
  { id: 14, title: "Россия 1", genre: "Информация / Драмы", rating: null, img: IMG_ACTION, live: true, type: "tv" },
  { id: 15, title: "НТВ", genre: "Новости / Криминал", rating: null, img: IMG_CARTOON, live: true, type: "tv" },
  { id: 16, title: "Карусель", genre: "Детский канал", rating: null, img: IMG_TV, live: true, type: "tv" },
  { id: 17, title: "ТНТ", genre: "Юмор / Реалити", rating: null, img: IMG_ACTION, live: false, type: "tv" },
  { id: 18, title: "СТС", genre: "Семейный / Сериалы", rating: null, img: IMG_CARTOON, live: true, type: "tv" },
];

const ALL_CONTENT = [...MOVIES, ...CARTOONS, ...TV_CHANNELS];

const TICKER_ITEMS = [
  "🔥 Новинка: Дюна: Часть вторая",
  "⭐ ТОП рейтинга: Оппенгеймер",
  "🎬 Эксклюзив: Мастер и Маргарита",
  "📺 В прямом эфире: Первый канал",
  "🎭 Рекомендуем: Прошлые жизни",
  "🚀 Новый сезон: Смешарики",
];

export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return ALL_CONTENT.filter((item) => item.title.toLowerCase().includes(q)).slice(0, 6);
  }, [search]);

  const visibleMovies = section === "home" ? MOVIES.slice(0, 4) : MOVIES;
  const visibleCartoons = section === "home" ? CARTOONS.slice(0, 4) : CARTOONS;

  const navItems: { id: Section; label: string; icon: string }[] = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "cartoons", label: "Мультсериалы", icon: "Laugh" },
    { id: "movies", label: "Фильмы", icon: "Film" },
    { id: "tv", label: "ТВ-каналы", icon: "Tv" },
  ];

  const handleNavClick = (id: Section) => {
    setSection(id);
    setMobileMenuOpen(false);
    setSearch("");
  };

  return (
    <div className="min-h-screen noise-bg" style={{ background: "var(--cinema-bg)" }}>

      {/* Header */}
      <header className="sticky top-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16 gap-6">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer flex-shrink-0"
              onClick={() => handleNavClick("home")}
            >
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Icon name="Play" size={16} className="text-white" />
              </div>
              <span className="section-title text-lg text-white hidden sm:block">
                CINEMA<span className="gradient-text">STREAM</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 flex-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-item text-sm font-medium transition-colors ${
                    section === item.id ? "active text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Search */}
            <div className="flex-1 md:flex-none md:w-72 relative">
              <div
                className="search-glow flex items-center gap-2 rounded-xl px-4 py-2 transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <Icon name="Search" size={16} className="flex-shrink-0" style={{ color: "var(--cinema-muted)" }} />
                <input
                  type="text"
                  placeholder="Поиск фильмов, сериалов..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  className="bg-transparent outline-none text-sm w-full placeholder-gray-500"
                  style={{ color: "var(--cinema-text)" }}
                />
                {search && (
                  <button onClick={() => setSearch("")}>
                    <Icon name="X" size={14} style={{ color: "var(--cinema-muted)" }} />
                  </button>
                )}
              </div>

              {/* Dropdown */}
              {searchFocused && searchResults.length > 0 && (
                <div className="search-dropdown absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-50 animate-fade-in">
                  {searchResults.map((item) => (
                    <button
                      key={item.id}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                      onClick={() => {
                        setSearch(item.title);
                        setSearchFocused(false);
                      }}
                    >
                      <img src={item.img} alt={item.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-white truncate">{item.title}</div>
                        <div className="text-xs" style={{ color: "var(--cinema-muted)" }}>
                          {item.type === "tv" ? "ТВ-канал" : item.type === "movies" ? "Фильм" : "Мультсериал"} · {(item as { genre: string }).genre}
                        </div>
                      </div>
                      {"rating" in item && item.rating && (
                        <div className="ml-auto text-xs font-bold star-rating flex-shrink-0">★ {item.rating}</div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden ml-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} className="text-white" />
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 animate-fade-in">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 w-full px-2 py-3 rounded-lg transition-colors ${
                    section === item.id ? "text-white bg-white/10" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Ticker */}
      <div
        className="ticker-wrap py-2"
        style={{ background: "rgba(224,64,251,0.08)", borderBottom: "1px solid rgba(224,64,251,0.15)" }}
      >
        <div className="ticker-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="mx-8 text-sm whitespace-nowrap" style={{ color: "var(--cinema-muted)" }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10">

        {/* HERO — Home only */}
        {section === "home" && (
          <div className="relative rounded-2xl overflow-hidden mb-10 animate-fade-in" style={{ minHeight: 380 }}>
            <img src={IMG_ACTION} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
            <div className="hero-overlay absolute inset-0" />
            <div className="relative z-10 flex flex-col justify-end p-8" style={{ minHeight: 380 }}>
              <div className="flex gap-2 mb-3">
                <span className="badge-new">Новинка</span>
                <span className="badge-hd">4K HDR</span>
              </div>
              <h1 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-4xl sm:text-5xl font-bold text-white mb-2 uppercase tracking-wide">
                Стражи Галактики
              </h1>
              <p className="text-gray-300 text-sm sm:text-base mb-5 max-w-lg">
                Команда отважных героев снова в деле. Эпическое космическое приключение, которое изменит всё.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <button className="play-btn flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold">
                  <Icon name="Play" size={18} />
                  Смотреть
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold glass transition-all hover:bg-white/10"
                  style={{ color: "var(--cinema-text)" }}
                >
                  <Icon name="Info" size={18} />
                  Подробнее
                </button>
                <div className="flex items-center gap-1 font-bold" style={{ color: "#ffd700" }}>
                  <Icon name="Star" size={16} />
                  <span>8.7</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section page header */}
        {section !== "home" && (
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1 h-8 rounded-full gradient-bg" />
              <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-3xl font-bold text-white uppercase tracking-wide">
                {section === "movies" && "Фильмы"}
                {section === "cartoons" && "Мультсериалы"}
                {section === "tv" && "ТВ-каналы"}
              </h2>
            </div>
            <p className="ml-4 text-sm" style={{ color: "var(--cinema-muted)" }}>
              {section === "movies" && `${MOVIES.length} фильмов в коллекции`}
              {section === "cartoons" && `${CARTOONS.length} мультсериалов для всей семьи`}
              {section === "tv" && `${TV_CHANNELS.length} каналов в прямом эфире`}
            </p>
          </div>
        )}

        {/* MOVIES */}
        {(section === "home" || section === "movies") && (
          <section className="mb-10">
            {section === "home" && (
              <div className="flex items-center justify-between mb-5 animate-fade-in-delay-1">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 rounded-full gradient-bg" />
                  <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold text-white uppercase tracking-wide">Фильмы</h2>
                </div>
                <button
                  onClick={() => setSection("movies")}
                  className="text-sm flex items-center gap-1 transition-colors hover:text-white"
                  style={{ color: "var(--cinema-accent1)" }}
                >
                  Все фильмы <Icon name="ChevronRight" size={16} />
                </button>
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {visibleMovies.map((movie, i) => (
                <ContentCard key={movie.id} item={movie} delay={i} />
              ))}
            </div>
          </section>
        )}

        {/* CARTOONS */}
        {(section === "home" || section === "cartoons") && (
          <section className="mb-10">
            {section === "home" && (
              <div className="flex items-center justify-between mb-5 animate-fade-in-delay-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 rounded-full gradient-bg" />
                  <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold text-white uppercase tracking-wide">Мультсериалы</h2>
                </div>
                <button
                  onClick={() => setSection("cartoons")}
                  className="text-sm flex items-center gap-1 transition-colors hover:text-white"
                  style={{ color: "var(--cinema-accent1)" }}
                >
                  Все мультсериалы <Icon name="ChevronRight" size={16} />
                </button>
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {visibleCartoons.map((item, i) => (
                <ContentCard key={item.id} item={item} delay={i} />
              ))}
            </div>
          </section>
        )}

        {/* TV */}
        {(section === "home" || section === "tv") && (
          <section className="mb-10">
            {section === "home" && (
              <div className="flex items-center justify-between mb-5 animate-fade-in-delay-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 rounded-full gradient-bg" />
                  <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold text-white uppercase tracking-wide">ТВ-каналы</h2>
                </div>
                <button
                  onClick={() => setSection("tv")}
                  className="text-sm flex items-center gap-1 transition-colors hover:text-white"
                  style={{ color: "var(--cinema-accent1)" }}
                >
                  Все каналы <Icon name="ChevronRight" size={16} />
                </button>
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {(section === "home" ? TV_CHANNELS.slice(0, 4) : TV_CHANNELS).map((ch, i) => (
                <TVCard key={ch.id} channel={ch} delay={i} />
              ))}
            </div>
          </section>
        )}

        {/* No search results */}
        {search && !searchFocused && searchResults.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-16 h-16 rounded-full glass flex items-center justify-center mb-4">
              <Icon name="SearchX" size={28} style={{ color: "var(--cinema-muted)" }} />
            </div>
            <p className="text-lg font-medium text-white mb-1">Ничего не найдено</p>
            <p className="text-sm" style={{ color: "var(--cinema-muted)" }}>Попробуйте другой запрос</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="border-t py-8 text-center"
        style={{ borderColor: "rgba(255,255,255,0.06)", color: "var(--cinema-muted)" }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md gradient-bg flex items-center justify-center">
            <Icon name="Play" size={12} className="text-white" />
          </div>
          <span style={{ fontFamily: "'Oswald', sans-serif" }} className="text-sm text-white tracking-wide">
            CINEMA<span className="gradient-text">STREAM</span>
          </span>
        </div>
        <p className="text-xs">© 2024 CinemaStream. Смотри всё.</p>
      </footer>
    </div>
  );
}

interface ContentItem {
  id: number; title: string; year?: number; genre: string; rating: number | null;
  img: string; badge?: string | null; hd?: boolean; type: string; live?: boolean;
}

function ContentCard({ item, delay }: { item: ContentItem; delay: number }) {
  return (
    <div
      className={`card-hover rounded-xl overflow-hidden cursor-pointer animate-fade-in-delay-${Math.min(delay + 1, 5)}`}
      style={{ background: "var(--cinema-card)" }}
    >
      <div className="relative aspect-[2/3]">
        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)" }}
        />
        {item.badge && (
          <div className="absolute top-2 left-2">
            <span className="badge-new">{item.badge === "new" ? "Новинка" : item.badge}</span>
          </div>
        )}
        {item.hd && (
          <div className="absolute top-2 right-2">
            <span className="badge-hd">HD</span>
          </div>
        )}
        <button className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full play-btn flex items-center justify-center">
            <Icon name="Play" size={20} className="text-white" />
          </div>
        </button>
        {item.rating && (
          <div className="absolute bottom-2 left-3">
            <span className="text-xs font-bold flex items-center gap-1" style={{ color: "#ffd700" }}>
              <Icon name="Star" size={12} />
              {item.rating}
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-white truncate mb-1">{item.title}</h3>
        <p className="text-xs" style={{ color: "var(--cinema-muted)" }}>
          {item.genre} · {item.year}
        </p>
      </div>
    </div>
  );
}

function TVCard({ channel, delay }: { channel: ContentItem; delay: number }) {
  return (
    <div
      className={`card-hover rounded-xl overflow-hidden cursor-pointer animate-fade-in-delay-${Math.min(delay + 1, 5)}`}
      style={{ background: "var(--cinema-card)" }}
    >
      <div className="relative aspect-video">
        <img src={channel.img} alt={channel.title} className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }}
        />
        {channel.live && (
          <div
            className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md"
            style={{ background: "rgba(220,30,50,0.9)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-white text-xs font-bold">LIVE</span>
          </div>
        )}
        <button className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full play-btn flex items-center justify-center">
            <Icon name="Tv" size={20} className="text-white" />
          </div>
        </button>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-white truncate mb-1">{channel.title}</h3>
        <p className="text-xs" style={{ color: "var(--cinema-muted)" }}>{channel.genre}</p>
      </div>
    </div>
  );
}