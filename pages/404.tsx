import React from 'react';
import NavbarTemplate from '@/components/navbarTemplate';

const err404: React.FC = () => {
  return (
    <div>
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
    </div>
  );
};

export default NavbarTemplate(err404);
