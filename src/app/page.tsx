// src/app/page.tsx
'use client';

import { useState, useMemo } from 'react';
import type { Product, SaleItem, ProductBatch, DiscountSet } from '@/types';
import { summerSale, vintageSale } from '@/discount-engine/lib/my-campaigns';
import { getMyDiscounts } from '@/discount-engine/lib/discount-service';

// --- උදාහරණයක් සඳහා Products සහ Batches ---
const oldBatch: ProductBatch = { id: 't-shirt-batch-old', batchNumber: 'OLD-2023', price: 2000 };
const newBatch: ProductBatch = { id: 't-shirt-batch-new', batchNumber: 'NEW-2024', price: 2500 };
const sampleProducts: Product[] = [
  { id: 't-shirt-01', name: 'T-Shirt', price: 2500, batches: [oldBatch, newBatch] },
  { id: 'jeans-01', name: 'Jeans', price: 7000 },
];
// ---

const allCampaigns = [summerSale, vintageSale];

export default function Home() {
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [activeCampaign, setActiveCampaign] = useState<DiscountSet>(summerSale);

  const addToCart = (product: Product, batch?: ProductBatch) => {
    const saleItem: SaleItem = {
      ...product,
      saleItemId: `item-${Date.now()}`,
      quantity: 1,
      selectedBatch: batch,
      price: batch ? batch.price : product.price // Batch එකේ මිල ගන්නවා
    };
    setCart(currentCart => [...currentCart, saleItem]);
  };

  // වට්ටම් ගණනය කිරීම
  const discountResult = useMemo(() => {
    return getMyDiscounts(cart, activeCampaign);
  }, [cart, activeCampaign]);

  const originalTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>My New Shop</h1>
      
      {/* Campaign තෝරන Dropdown එක */}
      <div>
        <label htmlFor="campaign-selector">Select Discount Campaign: </label>
        <select
          id="campaign-selector"
          value={activeCampaign.id}
          onChange={(e) => setActiveCampaign(allCampaigns.find(c => c.id === e.target.value) || summerSale)}
        >
          {allCampaigns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        <div>
          <h3>Products</h3>
          {sampleProducts.map(p => (
            <div key={p.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem 0' }}>
              <h4>{p.name}</h4>
              {p.batches ? (
                p.batches.map( b => (
                  <div key={b.id} style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
                    <p>Batch: {b.batchNumber} - Rs. {b.price.toFixed(2)}</p>
                    <button onClick={() => addToCart(p, b)}>Add this Batch</button>
                  </div>
                ))
              ) : (
                 <div>
                    <p>Price: Rs. {p.price.toFixed(2)}</p>
                    <button onClick={() => addToCart(p)}>Add to Cart</button>
                 </div>
              )}
            </div>
          ))}
        </div>

        <div>
          <h3>Shopping Cart</h3>
          {cart.map(item => (
            <div key={item.saleItemId}>
              <p>{item.name} {item.selectedBatch && `(Batch: ${item.selectedBatch.batchNumber})`}</p>
            </div>
          ))}
          <hr />
          <h4>Summary</h4>
          <p>Original Total: Rs. {originalTotal.toFixed(2)}</p>
          <p style={{ color: 'green' }}>Total Discount: -Rs. {(discountResult.totalItemDiscount + discountResult.totalCartDiscount).toFixed(2)}</p>
          <h4>Final Total: Rs. {(originalTotal - (discountResult.totalItemDiscount + discountResult.totalCartDiscount)).toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
}