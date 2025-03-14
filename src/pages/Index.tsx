
import { useState } from 'react';
import { products, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get unique categories
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );
  
  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full bg-gradient-to-r from-gray-900 to-gray-800 flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1565908708715-d9fe8314467d?q=80&w=1600&auto=format&fit=crop" 
            alt="Madagascar landscape" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 sm:px-6 z-10 animate-fade-in">
          <div className="max-w-xl">
            <div className="inline-block px-3 py-1 rounded-full backdrop-blur-sm bg-white/10 text-white text-sm font-medium mb-4 animate-slide-in">
              Boutique Malgache Authentique
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
              Découvrez l'Artisanat <span className="text-malagasy-green">Malgache</span> 
              <br /> <span className="text-malagasy-red">Exceptionnel</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              Des produits uniques et authentiques créés par des artisans talentueux de Madagascar, livrés directement chez vous.
            </p>
            <a href="#products" className="inline-block">
              <Button size="lg" className="button-hover">
                Découvrir les produits
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Products Section */}
      <div id="products" className="page-container pt-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Nos Produits</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de produits artisanaux malgaches, fabriqués avec passion et savoir-faire par des artisans locaux.
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher des produits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="whitespace-nowrap"
            >
              Tous
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-800 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche ou de filtrage.
            </p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-24 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Malagasy Market</h3>
              <p className="text-gray-400">
                Votre destination pour l'artisanat authentique malgache de qualité.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Liens Rapides</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Accueil</a></li>
                <li><a href="#products" className="text-gray-400 hover:text-white transition-colors">Produits</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">À propos</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-gray-400">
                Antananarivo, Madagascar<br />
                Email: contact@malagasymarket.mg<br />
                Tel: +261 34 12 345 67
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Malagasy Market. Tous droits réservés.
            </p>
            <p className="text-gray-500 text-sm mt-4 sm:mt-0">
              Projet de cours - Version démo
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
