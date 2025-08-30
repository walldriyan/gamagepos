// src/types.ts

// ඔබගේ අලුත් project එකේ "භාණ්ඩයක්" නිරූපණය කරන ආකාරය
export interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
  batches?: ProductBatch[]; // Batch තොරතුරු සඳහා
}

// ඔබගේ අලුත් project එකේ "කාණ්ඩයක්" (batch) නිරූපණය කරන ආකාරය
export interface ProductBatch {
  id: string;
  batchNumber: string;
  price: number; // Batch එකට විශේෂිත වූ මිල
}

// Cart එකේ ඇති භාණ්ඩයක්
export interface SaleItem extends Product {
  saleItemId: string; // Cart එකේදී වෙන් කර ගැනීමට
  quantity: number;
  selectedBatch?: ProductBatch; // කුමන batch එකෙන්ද ආවේ කියා දැනගැනීමට
}

// වට්ටම් නීතියක්
export interface SpecificDiscountRuleConfig {
  isEnabled: boolean;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  conditionMin?: number | null;
  applyFixedOnce?: boolean;
}

// සම්පූර්ණ වට්ටම් මාලාවක් (Campaign)
export interface DiscountSet {
  id: string;
  name: string;
  isActive: boolean;
  isDefault: boolean;
  isOneTimePerTransaction: boolean;
  productConfigurations?: {
    productId: string;
    lineItemValueRuleJson: SpecificDiscountRuleConfig | null;
  }[];
  batchConfigurations?: { // Batch-wise rules මෙහි අර්ථ දක්වයි
    productBatchId: string;
    lineItemValueRuleJson: SpecificDiscountRuleConfig | null;
  }[];
  globalCartPriceRuleJson?: SpecificDiscountRuleConfig | null;
}
