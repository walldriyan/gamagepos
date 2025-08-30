// src/lib/discount-service.ts
import { DiscountEngine } from '@/discount-engine';
import { DiscountSet, SaleItem } from '../models/types';


export function getMyDiscounts(cartItems: SaleItem[], activeCampaign: DiscountSet) {
  const engine = new DiscountEngine(activeCampaign);

  const context = {
    items: cartItems.map(item => ({
      ...item,
      productId: item.id,
      lineId: item.saleItemId,
      batchId: item.selectedBatch?.id
    })),
  };

  return engine.process(context);
}