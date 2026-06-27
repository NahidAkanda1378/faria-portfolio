import './globals.css';

export const metadata = {
  title: 'Faria Tasnim',
  description: 'Final-year Ph.D. student in Mathematical Sciences at Michigan Technological University. Research in Graph Decompositions and Partition Theory.',
  keywords: 'Faria Tasnim, graph theory, partition theory, discrete mathematics, PhD, Michigan Tech, mathematical sciences',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
