import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
