import { useState, useEffect } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const PRODUCTS = [
  { id:1, name:"Elara Sectional Sofa", category:"Sofas", price:2499, rating:4.8, reviews:124, material:"Premium Linen", colors:["#c8b89a","#6b5c4e","#e8e0d5"], dimensions:"340×160×85cm", image:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", desc:"Sink into cloud-like comfort. The Elara Sectional redefines modern lounging with deep cushions and a modular design that adapts to any living space.", featured:true },
  { id:2, name:"Monarch King Bed", category:"Beds", price:1899, rating:4.9, reviews:87, material:"Solid Walnut", colors:["#5c4a3a","#3d2e22","#8a7260"], dimensions:"210×200×130cm", image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80", desc:"Rest like royalty. The Monarch's hand-carved walnut headboard becomes the focal point of your sanctuary.", featured:true },
  { id:3, name:"Aria Dining Table", category:"Dining Tables", price:1350, rating:4.7, reviews:63, material:"Marble & Brass", colors:["#e8e0d5","#d4c4a8","#c0b090"], dimensions:"200×90×76cm", image:"https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", desc:"Gather around elegance. The Aria's Italian marble top and brushed brass base make every meal a celebration.", featured:true },
  { id:4, name:"Oslo Accent Chair", category:"Chairs", price:749, rating:4.6, reviews:201, material:"Boucle Fabric", colors:["#f5f0e8","#c8b89a","#8a7260"], dimensions:"75×80×90cm", image:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", desc:"Sculptural form meets cozy function. The Oslo's boucle upholstery and curved silhouette bring warmth to any corner." },
  { id:5, name:"Haven Wardrobe", category:"Wardrobes", price:2100, rating:4.5, reviews:45, material:"Oak Veneer", colors:["#c0a882","#8a7260","#6b5c4e"], dimensions:"240×60×220cm", image:"https://images.unsplash.com/photo-1558997519-83ea9252eef8?w=600&q=80", desc:"Organize in style. The Haven's intelligent interior layout and soft-close doors bring spa-like calm to your morning routine." },
  { id:6, name:"Studio Desk", category:"Office Furniture", price:890, rating:4.7, reviews:156, material:"Ash Wood", colors:["#c0a882","#5c4a3a","#e8e0d5"], dimensions:"160×70×75cm", image:"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80", desc:"Work beautifully. The Studio Desk pairs clean Scandinavian lines with thoughtful cable management and ample workspace." },
  { id:7, name:"Zenith Coffee Table", category:"Dining Tables", price:650, rating:4.8, reviews:93, material:"Travertine Stone", colors:["#e8e0d5","#c0b090","#8a7260"], dimensions:"120×60×40cm", image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", desc:"Natural luxury underfoot. Travertine's unique veining makes every Zenith table a one-of-a-kind statement piece." },
  { id:8, name:"Velvet Dining Chairs (Set of 4)", category:"Chairs", price:980, rating:4.6, reviews:78, material:"Velvet & Metal", colors:["#7c6b8a","#c8a87a","#3d2e22"], dimensions:"45×52×92cm", image:"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80", desc:"Dress your dining table in luxury. Hand-tufted velvet seats and gold-tipped legs elevate every dinner party.", featured:true },
  { id:9, name:"Cosmos Floor Lamp", category:"Decorations", price:320, rating:4.5, reviews:112, material:"Brass & Marble", colors:["#c0a055","#e8e0d5","#3d2e22"], dimensions:"35×35×175cm", image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", desc:"Cast rooms in golden light. The Cosmos's arcing brass arm and marble base bring sculptural drama to any space." },
  { id:10, name:"Linen Storage Ottoman", category:"Sofas", price:420, rating:4.4, reviews:67, material:"Natural Linen", colors:["#e8e0d5","#c8b89a","#8a7260"], dimensions:"100×60×45cm", image:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", desc:"Storage meets style. Lift the lid to reveal generous storage while enjoying a beautiful extra seating option." },
  { id:11, name:"Boho Rattan Mirror", category:"Decorations", price:280, rating:4.7, reviews:89, material:"Natural Rattan", colors:["#c0a055","#8a7260","#5c4a3a"], dimensions:"80×80cm", image:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", desc:"Bring texture and warmth to your walls. Hand-woven rattan frames create a boho-luxe statement." },
  { id:12, name:"Executive Office Chair", category:"Office Furniture", price:1200, rating:4.8, reviews:134, material:"Full-Grain Leather", colors:["#3d2e22","#6b5c4e","#c0a055"], dimensions:"70×70×115-125cm", image:"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80", desc:"Command respect. Premium full-grain leather and lumbar-perfected ergonomics for those who lead." },
];

const CATEGORIES = ["All", "Sofas", "Beds", "Dining Tables", "Chairs", "Wardrobes", "Office Furniture", "Decorations"];

const ORDERS = [
  { id:"#HH-00123", date:"12 Apr 2025", status:"Delivered", total:3248, items:2 },
  { id:"#HH-00098", date:"03 Mar 2025", status:"Delivered", total:749, items:1 },
  { id:"#HH-00076", date:"18 Jan 2025", status:"Delivered", total:1350, items:1 },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const formatPrice = (n) => `$${n.toLocaleString()}`;
const Stars = ({ rating }) => (
  <span style={{color:"#c0a055",fontSize:13}}>
    {"★".repeat(Math.round(rating))}{"☆".repeat(5-Math.round(rating))} <span style={{color:"#888",fontSize:12}}>{rating}</span>
  </span>
);

// CSS is loaded via src/index.css

// ─── HEADER ───────────────────────────────────────────────────────────────────

const Header = ({ page, setPage, cart, user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartCount = cart.reduce((a, i) => a + i.qty, 0);

  const nav = [
    { label:"Home", id:"home" },
    { label:"Shop", id:"catalog" },
    { label:"Collections", id:"catalog" },
  ];

  return (
    <header style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background: scrolled ? "rgba(250,248,244,0.97)" : "rgba(250,248,244,0.97)",borderBottom: scrolled ? "1px solid #e8dfc8" : "1px solid transparent",backdropFilter:"blur(12px)",transition:"all .3s"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 32px",display:"flex",alignItems:"center",justifyContent:"space-between",height:70}}>
        {/* Logo */}
        <div onClick={() => setPage("home")} style={{cursor:"pointer"}}>
          <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:22,fontWeight:600,letterSpacing:2,color:"#2c2418",lineHeight:1}}>HEAVEN & HOME</div>
          <div style={{fontSize:9,letterSpacing:4,color:"#c0a055",textTransform:"uppercase",marginTop:2}}>Luxury Furniture</div>
        </div>

        {/* Desktop Nav */}
        <nav style={{display:"flex",gap:36,alignItems:"center"}}>
          {nav.map(n => (
            <span key={n.id} onClick={() => setPage(n.id)} style={{fontSize:12,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",color: page===n.id ? "#c0a055" : "#2c2418",fontWeight:500,transition:"color .2s",paddingBottom:2,borderBottom: page===n.id ? "1px solid #c0a055" : "1px solid transparent"}}>{n.label}</span>
          ))}
        </nav>

        {/* Actions */}
        <div style={{display:"flex",alignItems:"center",gap:20}}>
          {user ? (
            <span onClick={() => setPage("dashboard")} style={{fontSize:12,letterSpacing:1,cursor:"pointer",color:"#5c4a3a"}}>Hi, {user.name?.split(" ")[0]}</span>
          ) : (
            <span onClick={() => setPage("login")} style={{fontSize:12,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",color:"#5c4a3a"}}>Login</span>
          )}
          <div onClick={() => setPage("cart")} style={{position:"relative",cursor:"pointer"}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2c2418" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            {cartCount > 0 && <div style={{position:"absolute",top:-6,right:-6,background:"#c0a055",color:"#fff",fontSize:10,width:18,height:18,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:600}}>{cartCount}</div>}
          </div>
          {user && <div onClick={() => setPage("admin")} style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",background:"#2c2418",color:"#c0a055",padding:"5px 12px",borderRadius:2}}>Admin</div>}
        </div>
      </div>
    </header>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────

const Footer = ({ setPage }) => (
  <footer style={{background:"#1e1510",color:"#c8b89a",marginTop:80}}>
    <div style={{maxWidth:1280,margin:"0 auto",padding:"60px 32px 40px",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:48}}>
      <div>
        <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:24,fontWeight:600,color:"#faf8f4",marginBottom:8}}>HEAVEN & HOME</div>
        <div style={{fontSize:9,letterSpacing:4,color:"#c0a055",marginBottom:20}}>LUXURY FURNITURE</div>
        <p style={{fontSize:13,lineHeight:1.8,color:"#a09080",maxWidth:260}}>Crafting spaces of extraordinary beauty. Each piece is selected for quality, design, and lasting elegance.</p>
      </div>
      {[
        { title:"Navigate", links:["Home","Shop","Collections","About Us","Contact"] },
        { title:"Support", links:["FAQ","Shipping","Returns","Warranty","Care Guide"] },
        { title:"Legal", links:["Privacy Policy","Terms of Service","Cookie Policy"] },
      ].map(col => (
        <div key={col.title}>
          <div style={{fontSize:11,letterSpacing:3,textTransform:"uppercase",color:"#c0a055",marginBottom:20}}>{col.title}</div>
          {col.links.map(l => <div key={l} onClick={() => setPage("home")} style={{fontSize:13,color:"#a09080",marginBottom:10,cursor:"pointer",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#faf8f4"} onMouseLeave={e=>e.target.style.color="#a09080"}>{l}</div>)}
        </div>
      ))}
    </div>
    <div style={{borderTop:"1px solid #2c2418",padding:"20px 32px",maxWidth:1280,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <span style={{fontSize:12,color:"#5c4a3a"}}>© 2025 Heaven & Home. All rights reserved.</span>
      <span style={{fontSize:12,color:"#5c4a3a"}}>Crafted with care in Cairo, Egypt</span>
    </div>
  </footer>
);

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

const HomePage = ({ setPage, addToCart }) => {
  const featured = PRODUCTS.filter(p => p.featured);

  return (
    <div className="page-fade">
      {/* Hero */}
      <section style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"url('https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=80') center/cover"}}>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to right, rgba(30,21,16,0.85) 0%, rgba(30,21,16,0.4) 60%, transparent 100%)"}}/>
        </div>
        <div style={{position:"relative",maxWidth:1280,margin:"0 auto",padding:"0 32px",width:"100%",paddingTop:100}}>
          <div style={{maxWidth:600}}>
            <div style={{fontSize:11,letterSpacing:5,textTransform:"uppercase",color:"#c0a055",marginBottom:24}}>New Collection 2025</div>
            <h1 className="serif" style={{fontSize:"clamp(48px,6vw,88px)",fontWeight:400,color:"#faf8f4",lineHeight:1.05,marginBottom:24,fontStyle:"italic"}}>Where Every Room<br/><span style={{fontStyle:"normal",fontWeight:600}}>Tells Your Story</span></h1>
            <p style={{fontSize:16,color:"#c8b89a",lineHeight:1.8,marginBottom:40,maxWidth:460}}>Discover furniture that transforms houses into havens. Timeless designs, uncompromising quality, delivered to your door.</p>
            <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
              <button className="btn-gold" onClick={() => setPage("catalog")}>Shop Now</button>
              <button className="btn-outline" style={{color:"#faf8f4",borderColor:"#faf8f4"}} onClick={() => setPage("catalog")}>View Collections</button>
            </div>
          </div>
        </div>
        {/* Scroll hint */}
        <div style={{position:"absolute",bottom:40,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
          <span style={{fontSize:10,letterSpacing:3,color:"#c0a055",textTransform:"uppercase"}}>Scroll</span>
          <div style={{width:1,height:48,background:"linear-gradient(to bottom,#c0a055,transparent)"}}/>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{background:"#2c2418",padding:"32px 0"}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 32px",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0,textAlign:"center"}}>
          {[["12K+","Happy Customers"],["500+","Curated Pieces"],["15","Years of Excellence"],["Free","Delivery over $500"]].map(([n,l]) => (
            <div key={l} style={{padding:"8px 16px",borderRight:"1px solid #3d2e22"}}>
              <div className="serif" style={{fontSize:36,color:"#c0a055",fontWeight:500}}>{n}</div>
              <div style={{fontSize:11,letterSpacing:2,color:"#a09080",textTransform:"uppercase",marginTop:4}}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{maxWidth:1280,margin:"0 auto",padding:"100px 32px 0"}}>
        <div style={{textAlign:"center",marginBottom:60}}>
          <div style={{fontSize:11,letterSpacing:5,textTransform:"uppercase",color:"#c0a055",marginBottom:16}}>Handpicked for You</div>
          <h2 className="serif" style={{fontSize:48,fontWeight:400,fontStyle:"italic",color:"#2c2418"}}>Featured Pieces</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:32}}>
          {featured.map(p => <ProductCard key={p.id} product={p} setPage={null} addToCart={addToCart} onView={() => {}} />)}
        </div>
        <div style={{textAlign:"center",marginTop:48}}>
          <button className="btn-outline" onClick={() => setPage("catalog")}>Browse All Products</button>
        </div>
      </section>

      {/* Collections Banner */}
      <section style={{maxWidth:1280,margin:"100px auto 0",padding:"0 32px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
        {[
          {label:"Living Room",img:"https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80"},
          {label:"Bedroom",img:"https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80"},
        ].map(c => (
          <div key={c.label} onClick={() => setPage("catalog")} style={{position:"relative",height:420,borderRadius:2,overflow:"hidden",cursor:"pointer"}} onMouseEnter={e=>{e.currentTarget.querySelector("img").style.transform="scale(1.05)"}} onMouseLeave={e=>{e.currentTarget.querySelector("img").style.transform="scale(1)"}}>
            <img src={c.img} alt={c.label} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .6s ease"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(30,21,16,0.7),transparent)"}}/>
            <div style={{position:"absolute",bottom:36,left:36}}>
              <div className="serif" style={{fontSize:36,color:"#faf8f4",fontStyle:"italic"}}>{c.label}</div>
              <div style={{fontSize:11,letterSpacing:3,color:"#c0a055",marginTop:8,textTransform:"uppercase"}}>Explore Collection →</div>
            </div>
          </div>
        ))}
      </section>

      {/* Benefits */}
      <section style={{maxWidth:1280,margin:"100px auto 0",padding:"0 32px"}}>
        <div style={{textAlign:"center",marginBottom:60}}>
          <h2 className="serif" style={{fontSize:48,fontWeight:400,fontStyle:"italic",color:"#2c2418"}}>Why Choose Us</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24}}>
          {[
            {icon:"✦",title:"Handcrafted Quality",desc:"Every piece is crafted by master artisans using premium materials sourced globally."},
            {icon:"⟳",title:"30-Day Returns",desc:"Shop with confidence. Free returns on all items within 30 days, no questions asked."},
            {icon:"⊕",title:"Free Delivery",desc:"Complimentary white-glove delivery and assembly on all orders above $500."},
            {icon:"☆",title:"5-Year Warranty",desc:"Our furniture is built to last. Every piece carries our exclusive 5-year craftsmanship guarantee."},
          ].map(b => (
            <div key={b.title} style={{textAlign:"center",padding:"40px 24px",background:"#fff",borderRadius:2,border:"1px solid #e8dfc8"}}>
              <div style={{fontSize:28,color:"#c0a055",marginBottom:20}}>{b.icon}</div>
              <div style={{fontSize:16,fontWeight:600,color:"#2c2418",marginBottom:12}}>{b.title}</div>
              <div style={{fontSize:13,color:"#5c4a3a",lineHeight:1.8}}>{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{background:"#f5f0e8",marginTop:100,padding:"80px 32px"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:60}}>
            <div style={{fontSize:11,letterSpacing:5,textTransform:"uppercase",color:"#c0a055",marginBottom:16}}>Customer Stories</div>
            <h2 className="serif" style={{fontSize:48,fontWeight:400,fontStyle:"italic",color:"#2c2418"}}>They Love Their Spaces</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:32}}>
            {[
              {name:"Sarah K.",role:"Interior Designer",text:"Heaven & Home transformed my clients' living room. The Elara Sectional is even more stunning in person — the quality is unmatched.",avatar:"S"},
              {name:"James T.",role:"Homeowner",text:"The delivery team was impeccable. My Monarch Bed was assembled perfectly and the room looks like it's out of a magazine.",avatar:"J"},
              {name:"Leila M.",role:"Architect",text:"I recommend Heaven & Home to all my clients. Their pieces have that rare quality of being both timeless and contemporary.",avatar:"L"},
            ].map(t => (
              <div key={t.name} style={{background:"#fff",padding:"36px",borderRadius:2,border:"1px solid #e8dfc8"}}>
                <div style={{fontSize:24,color:"#c0a055",marginBottom:16}}>❝</div>
                <p style={{fontSize:14,color:"#5c4a3a",lineHeight:1.9,marginBottom:24,fontStyle:"italic"}}>{t.text}</p>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:"#2c2418",color:"#c0a055",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Cormorant Garamond,serif",fontSize:18,fontWeight:600}}>{t.avatar}</div>
                  <div>
                    <div style={{fontWeight:600,fontSize:14,color:"#2c2418"}}>{t.name}</div>
                    <div style={{fontSize:12,color:"#c0a055"}}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{background:"#2c2418",padding:"80px 32px",textAlign:"center"}}>
        <div style={{fontSize:11,letterSpacing:5,textTransform:"uppercase",color:"#c0a055",marginBottom:20}}>Stay Inspired</div>
        <h2 className="serif" style={{fontSize:48,fontWeight:400,fontStyle:"italic",color:"#faf8f4",marginBottom:16}}>Join Our World</h2>
        <p style={{fontSize:14,color:"#a09080",marginBottom:36}}>Get early access to new collections, exclusive offers, and interior inspiration.</p>
        <div style={{display:"flex",gap:0,maxWidth:480,margin:"0 auto"}}>
          <input type="email" placeholder="Your email address" style={{flex:1,background:"rgba(255,255,255,0.08)",border:"1px solid #3d2e22",color:"#faf8f4",borderRight:"none",borderRadius:"2px 0 0 2px"}}/>
          <button className="btn-gold" style={{borderRadius:"0 2px 2px 0",whiteSpace:"nowrap"}}>Subscribe</button>
        </div>
      </section>
    </div>
  );
};

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────

const ProductCard = ({ product: p, addToCart, onView }) => {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => onView(p)} style={{background:"#fff",borderRadius:2,border:"1px solid #e8dfc8",overflow:"hidden",cursor:"pointer",transition:"all .3s",boxShadow: hovered ? "0 12px 40px rgba(44,36,24,0.12)" : "none",transform: hovered ? "translateY(-4px)" : "none"}}>
      <div style={{position:"relative",height:260,overflow:"hidden"}}>
        <img src={p.image} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .6s ease",transform: hovered ? "scale(1.05)" : "scale(1)"}}/>
        <div style={{position:"absolute",top:16,left:16,background:"#2c2418",color:"#c0a055",fontSize:10,letterSpacing:2,padding:"4px 12px",textTransform:"uppercase"}}>{p.category}</div>
      </div>
      <div style={{padding:"20px"}}>
        <div style={{fontSize:11,color:"#c0a055",marginBottom:4}}><Stars rating={p.rating}/> ({p.reviews})</div>
        <h3 style={{fontSize:17,fontFamily:"Cormorant Garamond,serif",fontWeight:600,color:"#2c2418",marginBottom:6}}>{p.name}</h3>
        <p style={{fontSize:12,color:"#8a7260",lineHeight:1.6,marginBottom:16,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{p.desc}</p>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontFamily:"Cormorant Garamond,serif",fontSize:22,fontWeight:600,color:"#2c2418"}}>{formatPrice(p.price)}</span>
          <button className={added ? "btn-gold" : "btn-primary"} style={{padding:"10px 20px",fontSize:11}} onClick={handleAdd}>{added ? "Added!" : "Add to Cart"}</button>
        </div>
      </div>
    </div>
  );
};

// ─── CATALOG PAGE ─────────────────────────────────────────────────────────────

const CatalogPage = ({ addToCart, setCurrentProduct, setPage }) => {
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");

  let filtered = PRODUCTS.filter(p => cat === "All" || p.category === cat).filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  if (sort === "low") filtered = [...filtered].sort((a,b) => a.price-b.price);
  if (sort === "high") filtered = [...filtered].sort((a,b) => b.price-a.price);
  if (sort === "rating") filtered = [...filtered].sort((a,b) => b.rating-a.rating);

  const onView = (p) => { setCurrentProduct(p); setPage("product"); };

  return (
    <div className="page-fade" style={{paddingTop:100}}>
      {/* Hero Banner */}
      <div style={{background:"#f5f0e8",padding:"60px 32px",textAlign:"center",marginBottom:60}}>
        <div style={{fontSize:11,letterSpacing:5,textTransform:"uppercase",color:"#c0a055",marginBottom:12}}>Our Collection</div>
        <h1 className="serif" style={{fontSize:56,fontWeight:400,fontStyle:"italic",color:"#2c2418"}}>Curated Furniture</h1>
      </div>

      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 32px"}}>
        {/* Filters */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:40,flexWrap:"wrap",gap:16}}>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{padding:"8px 20px",fontSize:11,letterSpacing:1,border:"1px solid",borderRadius:2,cursor:"pointer",background: cat===c ? "#2c2418" : "transparent",color: cat===c ? "#faf8f4" : "#2c2418",borderColor: cat===c ? "#2c2418" : "#c8b89a",transition:"all .2s"}}>{c}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <input type="text" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:180,padding:"8px 14px",border:"1px solid #ddd5c4",borderRadius:2,fontSize:13}}/>
            <select value={sort} onChange={e=>setSort(e.target.value)} style={{padding:"8px 14px",border:"1px solid #ddd5c4",borderRadius:2,fontSize:13,background:"#fff"}}>
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
        </div>

        <div style={{marginBottom:16,fontSize:13,color:"#8a7260"}}>{filtered.length} products</div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:32,marginBottom:80}}>
          {filtered.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} onView={onView}/>)}
        </div>
      </div>
    </div>
  );
};

// ─── PRODUCT DETAIL ───────────────────────────────────────────────────────────

const ProductDetailPage = ({ product: p, addToCart, setPage }) => {
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [added, setAdded] = useState(false);
  const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0,3);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="page-fade" style={{paddingTop:100}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"60px 32px 0"}}>
        {/* Breadcrumb */}
        <div style={{fontSize:12,color:"#8a7260",marginBottom:40,display:"flex",gap:8,alignItems:"center"}}>
          <span onClick={() => setPage("home")} style={{cursor:"pointer",color:"#c0a055"}}>Home</span> /
          <span onClick={() => setPage("catalog")} style={{cursor:"pointer",color:"#c0a055"}}>Shop</span> /
          <span>{p.name}</span>
        </div>

        {/* Main */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,marginBottom:100}}>
          {/* Image */}
          <div>
            <div style={{height:560,borderRadius:2,overflow:"hidden",background:"#f5f0e8"}}>
              <img src={p.image} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
          </div>

          {/* Info */}
          <div>
            <div style={{fontSize:11,letterSpacing:3,textTransform:"uppercase",color:"#c0a055",marginBottom:12}}>{p.category}</div>
            <h1 className="serif" style={{fontSize:42,fontWeight:500,color:"#2c2418",marginBottom:12,lineHeight:1.1}}>{p.name}</h1>
            <div style={{marginBottom:16}}><Stars rating={p.rating}/> <span style={{fontSize:12,color:"#8a7260"}}>({p.reviews} reviews)</span></div>
            <div className="serif" style={{fontSize:40,fontWeight:500,color:"#2c2418",marginBottom:24}}>{formatPrice(p.price)}</div>
            <p style={{fontSize:14,color:"#5c4a3a",lineHeight:1.9,marginBottom:32}}>{p.desc}</p>

            {/* Details */}
            <div style={{background:"#f5f0e8",padding:"20px 24px",borderRadius:2,marginBottom:28}}>
              {[["Material",p.material],["Dimensions",p.dimensions],["Category",p.category]].map(([k,v]) => (
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #e8dfc8",fontSize:13}}>
                  <span style={{color:"#8a7260",fontWeight:500}}>{k}</span>
                  <span style={{color:"#2c2418"}}>{v}</span>
                </div>
              ))}
            </div>

            {/* Colors */}
            <div style={{marginBottom:28}}>
              <div style={{fontSize:12,letterSpacing:1,textTransform:"uppercase",color:"#5c4a3a",marginBottom:12}}>Color Options</div>
              <div style={{display:"flex",gap:10}}>
                {p.colors.map((c,i) => (
                  <div key={i} onClick={() => setSelectedColor(i)} style={{width:36,height:36,borderRadius:"50%",background:c,border: selectedColor===i ? "2px solid #2c2418" : "2px solid transparent",outline: selectedColor===i ? "2px solid #c0a055" : "2px solid transparent",cursor:"pointer",transition:"all .2s"}}/>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:28}}>
              <div style={{fontSize:12,letterSpacing:1,textTransform:"uppercase",color:"#5c4a3a"}}>Quantity</div>
              <div style={{display:"flex",alignItems:"center",border:"1px solid #ddd5c4",borderRadius:2,overflow:"hidden"}}>
                <button onClick={() => setQty(Math.max(1,qty-1))} style={{width:40,height:40,background:"transparent",fontSize:18,color:"#2c2418",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                <span style={{width:40,textAlign:"center",fontSize:15,fontWeight:500}}>{qty}</span>
                <button onClick={() => setQty(qty+1)} style={{width:40,height:40,background:"transparent",fontSize:18,color:"#2c2418",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
              </div>
            </div>

            <div style={{display:"flex",gap:16}}>
              <button className={added ? "btn-gold" : "btn-primary"} style={{flex:1,padding:"16px"}} onClick={handleAdd}>{added ? "Added to Cart!" : "Add to Cart"}</button>
              <button className="btn-outline" style={{padding:"16px 20px"}} onClick={() => setPage("cart")}>View Cart</button>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{marginBottom:80}}>
            <h2 className="serif" style={{fontSize:36,fontWeight:400,fontStyle:"italic",color:"#2c2418",marginBottom:36,textAlign:"center"}}>You May Also Like</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:28}}>
              {related.map(r => <ProductCard key={r.id} product={r} addToCart={addToCart} onView={(pr) => { window.scrollTo(0,0); }}/>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── CART PAGE ────────────────────────────────────────────────────────────────

const CartPage = ({ cart, setCart, setPage }) => {
  const updateQty = (id, delta) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const remove = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const subtotal = cart.reduce((a,i) => a + i.price * i.qty, 0);
  const delivery = subtotal > 500 ? 0 : 99;
  const total = subtotal + delivery;

  return (
    <div className="page-fade" style={{paddingTop:100}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"60px 32px"}}>
        <h1 className="serif" style={{fontSize:48,fontWeight:400,fontStyle:"italic",color:"#2c2418",marginBottom:48}}>Your Cart</h1>

        {cart.length === 0 ? (
          <div style={{textAlign:"center",padding:"80px 0"}}>
            <div style={{fontSize:64,marginBottom:20}}>◫</div>
            <h2 className="serif" style={{fontSize:32,fontStyle:"italic",color:"#8a7260",marginBottom:16}}>Your cart is empty</h2>
            <p style={{color:"#8a7260",marginBottom:32}}>Discover our curated furniture collection</p>
            <button className="btn-primary" onClick={() => setPage("catalog")}>Browse Collection</button>
          </div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"1fr 380px",gap:48}}>
            {/* Items */}
            <div>
              {cart.map(item => (
                <div key={item.id} style={{display:"grid",gridTemplateColumns:"120px 1fr",gap:24,padding:"28px 0",borderBottom:"1px solid #e8dfc8",alignItems:"center"}}>
                  <div style={{height:100,borderRadius:2,overflow:"hidden",background:"#f5f0e8"}}>
                    <img src={item.image} alt={item.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontSize:11,color:"#c0a055",letterSpacing:1,marginBottom:4}}>{item.category}</div>
                      <div style={{fontSize:17,fontFamily:"Cormorant Garamond,serif",fontWeight:600,color:"#2c2418",marginBottom:4}}>{item.name}</div>
                      <div style={{fontSize:15,color:"#5c4a3a"}}>{formatPrice(item.price)}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:16}}>
                      <div style={{display:"flex",alignItems:"center",border:"1px solid #ddd5c4",borderRadius:2}}>
                        <button onClick={() => updateQty(item.id,-1)} style={{width:32,height:32,background:"transparent",fontSize:16,color:"#2c2418"}}>−</button>
                        <span style={{width:32,textAlign:"center",fontSize:14}}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id,1)} style={{width:32,height:32,background:"transparent",fontSize:16,color:"#2c2418"}}>+</button>
                      </div>
                      <div style={{textAlign:"right",minWidth:80}}>
                        <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:20,fontWeight:600}}>{formatPrice(item.price*item.qty)}</div>
                      </div>
                      <button onClick={() => remove(item.id)} style={{background:"transparent",color:"#c0392b",fontSize:18,padding:"4px 8px"}}>✕</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{background:"#f5f0e8",padding:"36px",borderRadius:2,height:"fit-content",position:"sticky",top:90}}>
              <h2 className="serif" style={{fontSize:28,fontWeight:500,color:"#2c2418",marginBottom:28}}>Order Summary</h2>
              {[["Subtotal",formatPrice(subtotal)],["Delivery",delivery===0?"Free":formatPrice(delivery)],].map(([k,v]) => (
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid #e0d6c4",fontSize:14,color:"#5c4a3a"}}>
                  <span>{k}</span><span style={{fontWeight:500,color:delivery===0&&k==="Delivery"?"#27ae60":"#2c2418"}}>{v}</span>
                </div>
              ))}
              <div style={{display:"flex",justifyContent:"space-between",padding:"20px 0",fontSize:18,fontFamily:"Cormorant Garamond,serif",fontWeight:600,color:"#2c2418"}}>
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
              {delivery === 0 && <div style={{fontSize:12,color:"#27ae60",textAlign:"center",marginBottom:12}}>✓ You qualify for free delivery!</div>}
              <button className="btn-primary" style={{width:"100%",padding:"16px",marginBottom:12}} onClick={() => setPage("checkout")}>Proceed to Checkout</button>
              <button className="btn-outline" style={{width:"100%",padding:"14px"}} onClick={() => setPage("catalog")}>Continue Shopping</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── CHECKOUT PAGE ────────────────────────────────────────────────────────────

const CheckoutPage = ({ cart, setCart, setPage, user }) => {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("card");
  const subtotal = cart.reduce((a,i) => a + i.price*i.qty, 0);
  const delivery = subtotal > 500 ? 0 : 99;
  const total = subtotal + delivery;
  const [form, setForm] = useState({ fname: user?.name||"", email: user?.email||"", phone:"", address:"", city:"", country:"Egypt", zip:"" });
  const [placed, setPlaced] = useState(false);

  const handlePlace = () => { setPlaced(true); setCart([]); };

  if (placed) return (
    <div className="page-fade" style={{paddingTop:100,minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center",maxWidth:480}}>
        <div style={{width:80,height:80,borderRadius:"50%",background:"#f5f0e8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 24px"}}>✓</div>
        <h1 className="serif" style={{fontSize:48,fontStyle:"italic",color:"#2c2418",marginBottom:16}}>Order Confirmed!</h1>
        <p style={{color:"#5c4a3a",fontSize:14,lineHeight:1.8,marginBottom:8}}>Thank you for your order. You'll receive a confirmation email shortly.</p>
        <p style={{color:"#c0a055",fontSize:13,marginBottom:36}}>Order #HH-00{Math.floor(Math.random()*900+100)}</p>
        <button className="btn-primary" onClick={() => setPage("home")}>Back to Home</button>
      </div>
    </div>
  );

  return (
    <div className="page-fade" style={{paddingTop:100}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"60px 32px"}}>
        <h1 className="serif" style={{fontSize:48,fontWeight:400,fontStyle:"italic",color:"#2c2418",marginBottom:40}}>Checkout</h1>

        {/* Steps */}
        <div style={{display:"flex",alignItems:"center",gap:0,marginBottom:48}}>
          {["Shipping","Payment","Confirm"].map((s,i) => (
            <div key={s} style={{display:"flex",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={() => setStep(i+1)}>
                <div style={{width:32,height:32,borderRadius:"50%",background: step>=i+1 ? "#2c2418" : "#e8dfc8",color: step>=i+1 ? "#c0a055" : "#8a7260",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:600,transition:"all .3s"}}>{i+1}</div>
                <span style={{fontSize:12,letterSpacing:1,textTransform:"uppercase",color: step>=i+1 ? "#2c2418" : "#8a7260",fontWeight: step>=i+1 ? 600 : 400}}>{s}</span>
              </div>
              {i < 2 && <div style={{width:60,height:1,background:"#e8dfc8",margin:"0 12px"}}/>}
            </div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 360px",gap:48}}>
          <div>
            {step === 1 && (
              <div>
                <h2 style={{fontSize:18,fontWeight:600,color:"#2c2418",marginBottom:24}}>Shipping Information</h2>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                  {[["Full Name","fname","text"],["Email","email","email"],["Phone","phone","tel"],["Address","address","text"],["City","city","text"],["Country","country","text"],["Postal Code","zip","text"]].map(([label,key,type]) => (
                    <div key={key} className="form-group" style={key==="address"?{gridColumn:"1/-1"}:{}}>
                      <label>{label}</label>
                      <input type={type} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} placeholder={label}/>
                    </div>
                  ))}
                </div>
                <button className="btn-primary" style={{marginTop:8}} onClick={() => setStep(2)}>Continue to Payment</button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 style={{fontSize:18,fontWeight:600,color:"#2c2418",marginBottom:24}}>Payment Method</h2>
                {[["card","💳 Credit / Debit Card"],["cash","💵 Cash on Delivery"],["wallet","📱 Digital Wallet"]].map(([v,l]) => (
                  <div key={v} onClick={() => setMethod(v)} style={{display:"flex",alignItems:"center",gap:16,padding:"20px 24px",border: method===v ? "1px solid #2c2418" : "1px solid #e8dfc8",borderRadius:2,marginBottom:12,cursor:"pointer",background: method===v ? "#f5f0e8" : "#fff",transition:"all .2s"}}>
                    <div style={{width:20,height:20,borderRadius:"50%",border: method===v ? "5px solid #2c2418" : "2px solid #c8b89a",transition:"all .2s"}}/>
                    <span style={{fontSize:15,fontWeight: method===v ? 600 : 400,color:"#2c2418"}}>{l}</span>
                  </div>
                ))}
                {method === "card" && (
                  <div style={{background:"#f5f0e8",padding:24,borderRadius:2,marginTop:16}}>
                    <div className="form-group"><label>Card Number</label><input placeholder="1234 5678 9012 3456"/></div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                      <div className="form-group"><label>Expiry</label><input placeholder="MM/YY"/></div>
                      <div className="form-group"><label>CVV</label><input placeholder="123"/></div>
                    </div>
                  </div>
                )}
                <div style={{display:"flex",gap:12,marginTop:8}}>
                  <button className="btn-outline" onClick={() => setStep(1)}>Back</button>
                  <button className="btn-primary" onClick={() => setStep(3)}>Review Order</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 style={{fontSize:18,fontWeight:600,color:"#2c2418",marginBottom:24}}>Order Review</h2>
                {cart.map(item => (
                  <div key={item.id} style={{display:"flex",gap:16,padding:"16px 0",borderBottom:"1px solid #e8dfc8",alignItems:"center"}}>
                    <img src={item.image} alt={item.name} style={{width:64,height:64,objectFit:"cover",borderRadius:2}}/>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:600,fontSize:14,color:"#2c2418"}}>{item.name}</div>
                      <div style={{fontSize:12,color:"#8a7260"}}>Qty: {item.qty}</div>
                    </div>
                    <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:18,fontWeight:600}}>{formatPrice(item.price*item.qty)}</div>
                  </div>
                ))}
                <div style={{background:"#f5f0e8",padding:20,borderRadius:2,marginTop:20}}>
                  <div style={{fontSize:13,color:"#5c4a3a",marginBottom:4}}>Shipping to: <strong>{form.address}, {form.city}</strong></div>
                  <div style={{fontSize:13,color:"#5c4a3a"}}>Payment: {method === "card" ? "Credit Card" : method === "cash" ? "Cash on Delivery" : "Digital Wallet"}</div>
                </div>
                <div style={{display:"flex",gap:12,marginTop:20}}>
                  <button className="btn-outline" onClick={() => setStep(2)}>Back</button>
                  <button className="btn-gold" style={{flex:1,padding:"16px"}} onClick={handlePlace}>Confirm Order</button>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div style={{background:"#f5f0e8",padding:28,borderRadius:2,height:"fit-content"}}>
            <h3 className="serif" style={{fontSize:22,fontWeight:500,color:"#2c2418",marginBottom:20}}>Summary</h3>
            {cart.map(i => <div key={i.id} style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#5c4a3a",marginBottom:10}}><span>{i.name} ×{i.qty}</span><span>{formatPrice(i.price*i.qty)}</span></div>)}
            <div style={{borderTop:"1px solid #e0d6c4",marginTop:16,paddingTop:16}}>
              {[["Subtotal",formatPrice(subtotal)],["Delivery",delivery===0?"Free":formatPrice(delivery)]].map(([k,v]) => <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#5c4a3a",marginBottom:8}}><span>{k}</span><span>{v}</span></div>)}
              <div style={{display:"flex",justifyContent:"space-between",fontFamily:"Cormorant Garamond,serif",fontSize:22,fontWeight:600,color:"#2c2418",marginTop:12}}><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── REGISTER PAGE ────────────────────────────────────────────────────────────

const RegisterPage = ({ setPage, setUser }) => {
  const [form, setForm] = useState({ name:"",email:"",phone:"",password:"",confirm:"",address:"",city:"",country:"Egypt",zip:"",terms:false });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords must match";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.terms) e.terms = "You must accept the terms and conditions";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setUser({ name: form.name, email: form.email });
      setSuccess(true);
      setTimeout(() => { setPage("dashboard"); }, 1200);
    }
  };

  const F = ({ label, field, type="text", placeholder="" }) => (
    <div className="form-group">
      <label>{label}</label>
      <input type={type} placeholder={placeholder || label} value={form[field]} onChange={e=>setForm({...form,[field]:e.target.value})}/>
      {errors[field] && <div className="error-msg">⚠ {errors[field]}</div>}
    </div>
  );

  return (
    <div className="page-fade" style={{paddingTop:100,minHeight:"100vh",background:"#f5f0e8",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px 16px 60px"}}>
      <div style={{maxWidth:640,width:"100%",background:"#fff",borderRadius:2,padding:"56px 48px",border:"1px solid #e8dfc8"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:22,fontWeight:600,letterSpacing:2,color:"#2c2418"}}>HEAVEN & HOME</div>
          <h1 className="serif" style={{fontSize:38,fontWeight:400,fontStyle:"italic",color:"#2c2418",margin:"12px 0 8px"}}>Create Account</h1>
          <p style={{color:"#8a7260",fontSize:13}}>Join us for a world of curated furniture</p>
        </div>

        {success && <div style={{background:"#eafaf1",border:"1px solid #27ae60",color:"#27ae60",padding:"12px 16px",borderRadius:2,marginBottom:20,fontSize:13,textAlign:"center"}}>Account created! Redirecting...</div>}

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0}}>
          <div style={{paddingRight:12}}><F label="Full Name" field="name"/></div>
          <div style={{paddingLeft:12}}><F label="Email Address" field="email" type="email"/></div>
          <div style={{paddingRight:12}}><F label="Phone Number" field="phone" type="tel" placeholder="+20 100 000 0000"/></div>
          <div style={{paddingLeft:12}}><F label="Password" field="password" type="password" placeholder="Min. 6 characters"/></div>
          <div style={{paddingRight:12}}><F label="Confirm Password" field="confirm" type="password"/></div>
          <div style={{paddingLeft:12}}/>
          <div style={{gridColumn:"1/-1"}}><F label="Street Address" field="address" placeholder="123 Nile Street"/></div>
          <div style={{paddingRight:12}}><F label="City" field="city" placeholder="Cairo"/></div>
          <div style={{paddingLeft:12}}>
            <div className="form-group">
              <label>Country</label>
              <select value={form.country} onChange={e=>setForm({...form,country:e.target.value})}>
                {["Egypt","Saudi Arabia","UAE","Jordan","Kuwait","Qatar","Bahrain","Oman"].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div style={{paddingRight:12}}><F label="Postal Code" field="zip" placeholder="12345"/></div>
          <div style={{paddingLeft:12}}>
            <div className="form-group">
              <label>Profile Picture <span style={{color:"#c0a055"}}>(optional)</span></label>
              <input type="file" accept="image/*" style={{padding:"8px 0",border:"none",fontSize:12}}/>
            </div>
          </div>
        </div>

        <div style={{marginBottom:24}}>
          <label style={{display:"flex",alignItems:"flex-start",gap:12,cursor:"pointer"}}>
            <input type="checkbox" checked={form.terms} onChange={e=>setForm({...form,terms:e.target.checked})} style={{width:"auto",marginTop:2}}/>
            <span style={{fontSize:13,color:"#5c4a3a",lineHeight:1.6}}>I agree to the <span style={{color:"#c0a055",textDecoration:"underline"}}>Terms of Service</span> and <span style={{color:"#c0a055",textDecoration:"underline"}}>Privacy Policy</span></span>
          </label>
          {errors.terms && <div className="error-msg" style={{marginTop:4}}>⚠ {errors.terms}</div>}
        </div>

        <button className="btn-primary" style={{width:"100%",padding:"16px"}} onClick={handleSubmit}>Create Account</button>

        <p style={{textAlign:"center",marginTop:20,fontSize:13,color:"#8a7260"}}>Already have an account? <span onClick={() => setPage("login")} style={{color:"#c0a055",cursor:"pointer",fontWeight:500}}>Sign in</span></p>
      </div>
    </div>
  );
};

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────

const LoginPage = ({ setPage, setUser }) => {
  const [form, setForm] = useState({ email:"", password:"", remember:false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    if (!Object.keys(e).length) {
      setLoading(true);
      setTimeout(() => {
        setUser({ name: "Mohamed Ahmed", email: form.email });
        setPage("dashboard");
      }, 800);
    }
  };

  return (
    <div className="page-fade" style={{paddingTop:100,minHeight:"100vh",background:"#f5f0e8",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px 16px 60px"}}>
      <div style={{maxWidth:440,width:"100%",background:"#fff",borderRadius:2,padding:"56px 48px",border:"1px solid #e8dfc8"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:22,fontWeight:600,letterSpacing:2,color:"#2c2418"}}>HEAVEN & HOME</div>
          <h1 className="serif" style={{fontSize:38,fontWeight:400,fontStyle:"italic",color:"#2c2418",margin:"12px 0 8px"}}>Welcome Back</h1>
          <p style={{color:"#8a7260",fontSize:13}}>Sign in to your account</p>
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          {errors.email && <div className="error-msg">⚠ {errors.email}</div>}
        </div>

        <div className="form-group">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <label style={{margin:0}}>Password</label>
            <span style={{fontSize:12,color:"#c0a055",cursor:"pointer"}}>Forgot password?</span>
          </div>
          <input type="password" placeholder="Enter your password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
          {errors.password && <div className="error-msg">⚠ {errors.password}</div>}
        </div>

        <label style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",marginBottom:28}}>
          <input type="checkbox" checked={form.remember} onChange={e=>setForm({...form,remember:e.target.checked})} style={{width:"auto"}}/>
          <span style={{fontSize:13,color:"#5c4a3a"}}>Remember me</span>
        </label>

        <button className="btn-primary" style={{width:"100%",padding:"16px"}} onClick={handleLogin} disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>

        <div style={{position:"relative",margin:"28px 0",textAlign:"center"}}>
          <div style={{height:1,background:"#e8dfc8",position:"absolute",top:"50%",left:0,right:0}}/>
          <span style={{background:"#fff",padding:"0 16px",fontSize:12,color:"#c8b89a",position:"relative"}}>or</span>
        </div>

        <button className="btn-outline" style={{width:"100%",padding:"14px",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        <p style={{textAlign:"center",marginTop:24,fontSize:13,color:"#8a7260"}}>Don't have an account? <span onClick={() => setPage("register")} style={{color:"#c0a055",cursor:"pointer",fontWeight:500}}>Sign up</span></p>
      </div>
    </div>
  );
};

// ─── USER DASHBOARD ───────────────────────────────────────────────────────────

const DashboardPage = ({ user, setUser, setPage }) => {
  const [tab, setTab] = useState("profile");
  const tabs = [["profile","Profile"],["orders","Orders"],["addresses","Addresses"],["wishlist","Wishlist"]];

  return (
    <div className="page-fade" style={{paddingTop:100}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"60px 32px"}}>
        <h1 className="serif" style={{fontSize:48,fontWeight:400,fontStyle:"italic",color:"#2c2418",marginBottom:8}}>My Account</h1>
        <p style={{color:"#8a7260",fontSize:14,marginBottom:48}}>Welcome back, {user?.name}</p>

        <div style={{display:"grid",gridTemplateColumns:"240px 1fr",gap:40}}>
          {/* Sidebar */}
          <div>
            <div style={{background:"#f5f0e8",borderRadius:2,padding:"36px 24px",textAlign:"center",marginBottom:16,border:"1px solid #e8dfc8"}}>
              <div style={{width:80,height:80,borderRadius:"50%",background:"#2c2418",color:"#c0a055",fontFamily:"Cormorant Garamond,serif",fontSize:32,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>{user?.name?.[0]||"U"}</div>
              <div style={{fontWeight:600,fontSize:16,color:"#2c2418"}}>{user?.name}</div>
              <div style={{fontSize:12,color:"#8a7260",marginTop:4}}>{user?.email}</div>
            </div>
            <div style={{background:"#fff",borderRadius:2,border:"1px solid #e8dfc8",overflow:"hidden"}}>
              {tabs.map(([id,label]) => (
                <div key={id} onClick={() => setTab(id)} style={{padding:"14px 20px",fontSize:13,letterSpacing:.5,cursor:"pointer",borderBottom:"1px solid #e8dfc8",background: tab===id ? "#2c2418" : "transparent",color: tab===id ? "#c0a055" : "#5c4a3a",fontWeight: tab===id ? 500 : 400,transition:"all .2s"}}>{label}</div>
              ))}
              <div onClick={() => { setUser(null); setPage("home"); }} style={{padding:"14px 20px",fontSize:13,cursor:"pointer",color:"#c0392b",fontWeight:500}}>Sign Out</div>
            </div>
          </div>

          {/* Content */}
          <div style={{background:"#fff",borderRadius:2,border:"1px solid #e8dfc8",padding:"36px"}}>
            {tab === "profile" && (
              <div>
                <h2 style={{fontSize:20,fontWeight:600,color:"#2c2418",marginBottom:28}}>Profile Information</h2>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                  {[["Full Name",user?.name||""],["Email",user?.email||""],["Phone","+20 100 000 0000"],["Country","Egypt"],["City","Cairo"],["Postal Code","12345"]].map(([l,v]) => (
                    <div key={l} className="form-group">
                      <label>{l}</label>
                      <input defaultValue={v} style={{background:"#faf8f4"}}/>
                    </div>
                  ))}
                </div>
                <button className="btn-primary" style={{marginTop:8}}>Save Changes</button>
              </div>
            )}

            {tab === "orders" && (
              <div>
                <h2 style={{fontSize:20,fontWeight:600,color:"#2c2418",marginBottom:28}}>Order History</h2>
                {ORDERS.map(o => (
                  <div key={o.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px",border:"1px solid #e8dfc8",borderRadius:2,marginBottom:12,background:"#faf8f4"}}>
                    <div>
                      <div style={{fontWeight:600,fontSize:15,color:"#2c2418",marginBottom:4}}>{o.id}</div>
                      <div style={{fontSize:12,color:"#8a7260"}}>{o.date} · {o.items} item{o.items>1?"s":""}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{background:"#eafaf1",color:"#27ae60",fontSize:11,letterSpacing:1,padding:"4px 12px",borderRadius:20,marginBottom:8,textTransform:"uppercase"}}>{o.status}</div>
                      <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:20,fontWeight:600,color:"#2c2418"}}>{formatPrice(o.total)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "addresses" && (
              <div>
                <h2 style={{fontSize:20,fontWeight:600,color:"#2c2418",marginBottom:28}}>Saved Addresses</h2>
                {[{label:"Home (Default)",addr:"14 El-Tahrir Square, Cairo, Egypt 12345"},{label:"Office",addr:"55 Salah Salem Street, Nasr City, Cairo 11511"}].map(a => (
                  <div key={a.label} style={{padding:"20px 24px",border:"1px solid #e8dfc8",borderRadius:2,marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontWeight:600,fontSize:14,color:"#2c2418",marginBottom:4}}>{a.label}</div>
                      <div style={{fontSize:13,color:"#5c4a3a"}}>{a.addr}</div>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button className="btn-outline" style={{padding:"6px 16px",fontSize:11}}>Edit</button>
                      <button style={{padding:"6px 16px",fontSize:11,border:"1px solid #c0392b",color:"#c0392b",background:"transparent",borderRadius:2,cursor:"pointer"}}>Remove</button>
                    </div>
                  </div>
                ))}
                <button className="btn-outline" style={{marginTop:8,fontSize:12}}>+ Add New Address</button>
              </div>
            )}

            {tab === "wishlist" && (
              <div>
                <h2 style={{fontSize:20,fontWeight:600,color:"#2c2418",marginBottom:28}}>My Wishlist</h2>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
                  {PRODUCTS.slice(0,4).map(p => (
                    <div key={p.id} style={{border:"1px solid #e8dfc8",borderRadius:2,overflow:"hidden",display:"flex"}}>
                      <img src={p.image} alt={p.name} style={{width:80,height:80,objectFit:"cover"}}/>
                      <div style={{padding:"12px",flex:1}}>
                        <div style={{fontSize:13,fontWeight:600,color:"#2c2418",marginBottom:4}}>{p.name}</div>
                        <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:18,fontWeight:600,color:"#2c2418"}}>{formatPrice(p.price)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────

const AdminPage = ({ setPage }) => {
  const [tab, setTab] = useState("overview");

  const tabs = [["overview","Overview"],["products","Products"],["orders","Orders"],["customers","Customers"],["inventory","Inventory"]];
  const stats = [["$128,450","Total Revenue","+12%"],["1,248","Orders This Month","+8%"],["342","Active Customers","+23%"],["87","Products","5 Low Stock"]];

  return (
    <div className="page-fade" style={{paddingTop:70,minHeight:"100vh",background:"#1e1510",display:"flex"}}>
      {/* Sidebar */}
      <div style={{width:220,background:"#16100b",padding:"32px 0",position:"fixed",top:70,bottom:0,overflowY:"auto"}}>
        <div style={{padding:"0 24px 24px",borderBottom:"1px solid #2c2418"}}>
          <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"#c0a055",marginBottom:4}}>Admin Panel</div>
          <div style={{fontSize:13,color:"#a09080"}}>Heaven & Home</div>
        </div>
        {tabs.map(([id,label]) => (
          <div key={id} onClick={() => setTab(id)} style={{padding:"14px 24px",fontSize:13,cursor:"pointer",color: tab===id ? "#c0a055" : "#a09080",background: tab===id ? "rgba(192,160,85,0.08)" : "transparent",borderLeft: tab===id ? "2px solid #c0a055" : "2px solid transparent",transition:"all .2s",letterSpacing:.5}}>{label}</div>
        ))}
        <div onClick={() => setPage("home")} style={{padding:"14px 24px",fontSize:13,cursor:"pointer",color:"#5c4a3a",marginTop:24,borderTop:"1px solid #2c2418"}}>← Back to Store</div>
      </div>

      {/* Content */}
      <div style={{marginLeft:220,flex:1,padding:"40px 40px",overflowY:"auto"}}>
        {tab === "overview" && (
          <div>
            <h1 style={{fontFamily:"Cormorant Garamond,serif",fontSize:36,fontWeight:500,color:"#faf8f4",marginBottom:8}}>Dashboard Overview</h1>
            <p style={{fontSize:13,color:"#a09080",marginBottom:36}}>Monday, 12 May 2025</p>

            {/* Stats */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20,marginBottom:40}}>
              {stats.map(([val,label,change]) => (
                <div key={label} style={{background:"#2c2418",borderRadius:2,padding:"28px 24px",border:"1px solid #3d2e22"}}>
                  <div style={{fontSize:11,letterSpacing:2,color:"#c0a055",textTransform:"uppercase",marginBottom:12}}>{label}</div>
                  <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:32,fontWeight:500,color:"#faf8f4",marginBottom:8}}>{val}</div>
                  <div style={{fontSize:12,color:"#27ae60"}}>{change}</div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div style={{background:"#2c2418",borderRadius:2,padding:"28px",border:"1px solid #3d2e22",marginBottom:24}}>
              <h2 style={{fontSize:16,fontWeight:500,color:"#faf8f4",marginBottom:20,letterSpacing:1}}>Recent Orders</h2>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{borderBottom:"1px solid #3d2e22"}}>
                    {["Order","Customer","Items","Total","Status"].map(h => <th key={h} style={{textAlign:"left",padding:"8px 12px",fontSize:11,letterSpacing:2,textTransform:"uppercase",color:"#c0a055",fontWeight:500}}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[...ORDERS,{id:"#HH-00045",date:"05 Jan 2025",status:"Delivered",total:890,items:1}].map(o => (
                    <tr key={o.id} style={{borderBottom:"1px solid #2a1f17"}}>
                      <td style={{padding:"12px",fontSize:13,color:"#faf8f4"}}>{o.id}</td>
                      <td style={{padding:"12px",fontSize:13,color:"#a09080"}}>Mohamed A.</td>
                      <td style={{padding:"12px",fontSize:13,color:"#a09080"}}>{o.items}</td>
                      <td style={{padding:"12px",fontSize:13,color:"#c0a055",fontFamily:"Cormorant Garamond,serif",fontSize:16,fontWeight:600}}>{formatPrice(o.total)}</td>
                      <td style={{padding:"12px"}}><span style={{background:"rgba(39,174,96,0.15)",color:"#27ae60",fontSize:10,letterSpacing:1,padding:"4px 10px",borderRadius:20,textTransform:"uppercase"}}>{o.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "products" && (
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
              <h1 style={{fontFamily:"Cormorant Garamond,serif",fontSize:36,fontWeight:500,color:"#faf8f4"}}>Products</h1>
              <button className="btn-gold" style={{fontSize:12}}>+ Add Product</button>
            </div>
            <div style={{background:"#2c2418",borderRadius:2,padding:"28px",border:"1px solid #3d2e22"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{borderBottom:"1px solid #3d2e22"}}>
                    {["","Name","Category","Price","Stock","Rating","Actions"].map(h => <th key={h} style={{textAlign:"left",padding:"8px 12px",fontSize:11,letterSpacing:2,textTransform:"uppercase",color:"#c0a055",fontWeight:500}}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map(p => (
                    <tr key={p.id} style={{borderBottom:"1px solid #2a1f17"}}>
                      <td style={{padding:"12px 8px"}}><img src={p.image} style={{width:48,height:48,objectFit:"cover",borderRadius:2}}/></td>
                      <td style={{padding:"12px",fontSize:13,color:"#faf8f4",fontWeight:500}}>{p.name}</td>
                      <td style={{padding:"12px",fontSize:12,color:"#a09080"}}>{p.category}</td>
                      <td style={{padding:"12px",fontSize:14,color:"#c0a055",fontFamily:"Cormorant Garamond,serif",fontWeight:600}}>{formatPrice(p.price)}</td>
                      <td style={{padding:"12px"}}><span style={{color:"#27ae60",fontSize:12}}>In Stock</span></td>
                      <td style={{padding:"12px",fontSize:12,color:"#a09080"}}>{p.rating} ★</td>
                      <td style={{padding:"12px"}}>
                        <button style={{background:"transparent",color:"#c0a055",border:"1px solid #3d2e22",borderRadius:2,padding:"4px 12px",fontSize:11,cursor:"pointer",marginRight:6}}>Edit</button>
                        <button style={{background:"transparent",color:"#c0392b",border:"1px solid #3d2e22",borderRadius:2,padding:"4px 12px",fontSize:11,cursor:"pointer"}}>Del</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(tab === "orders" || tab === "customers" || tab === "inventory") && (
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:400}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:60,color:"#3d2e22",marginBottom:16}}>◫</div>
              <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:32,fontStyle:"italic",color:"#5c4a3a"}}>{tab.charAt(0).toUpperCase()+tab.slice(1)} Management</div>
              <p style={{fontSize:13,color:"#5c4a3a",marginTop:8}}>This section is ready for backend integration</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const showFooter = !["admin","login","register"].includes(page);
  const showHeader = page !== "admin";

  return (
    <>
      {showHeader && <Header page={page} setPage={setPage} cart={cart} user={user} setUser={setUser}/>}

      {page === "home" && <HomePage setPage={setPage} addToCart={addToCart}/>}
      {page === "catalog" && <CatalogPage addToCart={addToCart} setCurrentProduct={setCurrentProduct} setPage={setPage}/>}
      {page === "product" && currentProduct && <ProductDetailPage product={currentProduct} addToCart={addToCart} setPage={setPage}/>}
      {page === "cart" && <CartPage cart={cart} setCart={setCart} setPage={setPage}/>}
      {page === "checkout" && <CheckoutPage cart={cart} setCart={setCart} setPage={setPage} user={user}/>}
      {page === "register" && <RegisterPage setPage={setPage} setUser={setUser}/>}
      {page === "login" && <LoginPage setPage={setPage} setUser={setUser}/>}
      {page === "dashboard" && user && <DashboardPage user={user} setUser={setUser} setPage={setPage}/>}
      {page === "admin" && <AdminPage setPage={setPage}/>}

      {showFooter && <Footer setPage={setPage}/>}
    </>
  );
}
