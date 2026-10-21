import React from 'react';
import { TopBar } from '../components/store/TopBar';
import { Header } from '../components/store/Header';
import { SidebarMenu } from '../components/store/SidebarMenu';
import { HeroBanner } from '../components/store/HeroBanner';
import { FeaturesBar } from '../components/store/FeaturesBar';
import { FeaturedProductsSection } from '../components/store/FeaturedProductsSection';
import { SummerCollectionSection } from '../components/store/SummerCollectionSection';
import { BestSellersSection } from '../components/store/BestSellersSection';
import { BrandsSection } from '../components/store/BrandsSection';
import { NewsletterSection } from '../components/store/NewsletterSection';
import { Footer } from '../components/store/Footer';

export const StorePage: React.FC = () => {
  return (
    <div className="store-page-root">
      {/* Top Bar */}
      <TopBar />

      {/* Header */}
      <Header />

      {/* Main Content Area with Sidebar & Hero */}
      <div className="main-wrapper">
        <SidebarMenu />
        <HeroBanner />
      </div>

      {/* Features Bar */}
      <FeaturesBar />

      {/* Catalog Sections Container */}
      <div className="container">
        <FeaturedProductsSection />
        <SummerCollectionSection />
        <BestSellersSection />
        <BrandsSection />
      </div>

      {/* Newsletter */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};
