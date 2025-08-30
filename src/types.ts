// // src/types.ts

// // ඔබගේ අලුත් project එකේ "භාණ්ඩයක්" නිරූපණය කරන ආකාරය
// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   category?: string;
//   batches?: ProductBatch[]; // Batch තොරතුරු සඳහා
// }

// // ඔබගේ අලුත් project එකේ "කාණ්ඩයක්" (batch) නිරූපණය කරන ආකාරය
// export interface ProductBatch {
//   id: string;
//   batchNumber: string;
//   price: number; // Batch එකට විශේෂිත වූ මිල
// }

// // Cart එකේ ඇති භාණ්ඩයක්
// export interface SaleItem extends Product {
//   saleItemId: string; // Cart එකේදී වෙන් කර ගැනීමට
//   quantity: number;
//   selectedBatch?: ProductBatch; // කුමන batch එකෙන්ද ආවේ කියා දැනගැනීමට
// }

// // වට්ටම් නීතියක්
// export interface SpecificDiscountRuleConfig {
//   isEnabled: boolean;
//   name: string;
//   type: 'percentage' | 'fixed';
//   value: number;
//   conditionMin?: number | null;
//   applyFixedOnce?: boolean;
// }

// // සම්පූර්ණ වට්ටම් මාලාවක් (Campaign)
// export interface DiscountSet {
//   id: string;
//   name: string;
//   isActive: boolean;
//   isDefault: boolean;
//   isOneTimePerTransaction: boolean;
//   productConfigurations?: {
//     productId: string;
//     lineItemValueRuleJson: SpecificDiscountRuleConfig | null;
//   }[];
//   batchConfigurations?: { // Batch-wise rules මෙහි අර්ථ දක්වයි
//     productBatchId: string;
//     lineItemValueRuleJson: SpecificDiscountRuleConfig | null;
//   }[];
//   globalCartPriceRuleJson?: SpecificDiscountRuleConfig | null;
// }



// src/types.ts

// ඔබගේ project එකේ භාණ්ඩයක් නිරූපණය කරන ආකාරය
export interface Product {
  id: string;
  name: string;
  sellingPrice: number;
  category?: string;
  batches?: ProductBatch[];
  stock: number;
  units: UnitDefinition;
  isService: boolean;
  isActive: boolean;
  defaultQuantity: number;
}

// ඔබගේ අලුත් project එකේ "කාණ්ඩයක්" (batch) නිරූපණය කරන ආකාරය
export interface ProductBatch {
  id: string;
  batchNumber: string;
  sellingPrice: number; // Batch එකට විශේෂිත වූ මිල
  costPrice: number;
  quantity: number;
}

// Cart එකේ ඇති භාණ්ඩයක්
export interface SaleItem extends Product {
  saleItemId: string; // Cart එකේදී වෙන් කර ගැනීමට
  quantity: number;
  selectedBatch?: ProductBatch; // කුමන batch එකෙන්ද ආවේ කියා දැනගැනීමට
  price: number; // The actual price used for the sale (could be from batch or product)
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

export interface UnitDefinition {
  baseUnit: string;
  derivedUnits?: {
      name: string;
      conversionFactor: number;
      threshold: number;
  }[];
}


// **මෙම කොටස නිවැරදි කර ඇත**
export interface ProductDiscountConfiguration {
  productId: string;
  lineItemValueRuleJson: SpecificDiscountRuleConfig | null;
  // අවශ්‍ය නම්, වෙනත් rule types මෙහි එකතු කළ හැක
}

// **මෙම කොටස නිවැරදි කර ඇත**
export interface BatchDiscountConfiguration {
  productBatchId: string;
  lineItemValueRuleJson: SpecificDiscountRuleConfig | null;
  // අවශ්‍ය නම්, වෙනත් rule types මෙහි එකතු කළ හැක
}

export interface DiscountSet {
  id: string;
  name: string;
  isActive: boolean;
  isDefault: boolean;
  isOneTimePerTransaction: boolean;
  productConfigurations?: ProductDiscountConfiguration[];
  batchConfigurations?: BatchDiscountConfiguration[];
  globalCartPriceRuleJson?: SpecificDiscountRuleConfig | null;
}
