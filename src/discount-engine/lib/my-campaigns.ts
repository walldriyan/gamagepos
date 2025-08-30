// src/lib/my-campaigns.ts

import { DiscountSet } from "../models/types";


// **උදාහරණය 1: "Summer Sale" - බහු-වට්ටම් (Multiple Discounts)**
export const summerSale: DiscountSet = {
    id: 'promo-summer',
    name: 'Summer Sale',
    isActive: true,
    isDefault: true,
    isOneTimePerTransaction: false, // එකකට වඩා වට්ටම් ලැබිය හැක
    productConfigurations: [
        {
            productId: 't-shirt-01',
            lineItemValueRuleJson: {
                isEnabled: true, name: 'T-Shirt Offer', type: 'percentage', value: 10,
            }
        }
    ],
    globalCartPriceRuleJson: {
        isEnabled: true, name: 'Big Spender Bonus', type: 'fixed', value: 500, conditionMin: 10000
    },
    buyGetRulesJson: undefined
};

// **උදාහරණය 2: "Vintage Stock Clearance" - Batch-wise වට්ටම්**
export const vintageSale: DiscountSet = {
    id: 'promo-vintage',
    name: 'Vintage Stock Clearance',
    isActive: true,
    isDefault: false,
    isOneTimePerTransaction: false,
    batchConfigurations: [
        {
            productBatchId: 't-shirt-batch-old',
            lineItemValueRuleJson: {
                isEnabled: true, name: 'Clearance: Old T-Shirt Batch', type: 'percentage', value: 50
            }
        }
    ],
    productConfigurations: [
        {
            productId: 't-shirt-01',
            lineItemValueRuleJson: {
                isEnabled: true, name: 'T-Shirt Offer', type: 'percentage', value: 10
            }
        }
    ],
    buyGetRulesJson: undefined
};