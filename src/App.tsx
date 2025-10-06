import { useState } from 'react';
import { Calculator } from 'lucide-react';

function calculate_discount(price: number, discount_percent: number): number {
  if (discount_percent >= 20) {
    return price - (price * discount_percent / 100);
  }
  return price;
}

function App() {
  const [price, setPrice] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<string>('');
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);

  const handleCalculate = () => {
    const priceValue = parseFloat(price);
    const discountValue = parseFloat(discountPercent);

    if (isNaN(priceValue) || isNaN(discountValue) || priceValue < 0 || discountValue < 0) {
      alert('Please enter valid positive numbers');
      return;
    }

    const result = calculate_discount(priceValue, discountValue);
    setFinalPrice(result);
    setDiscountApplied(discountValue >= 20);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-500 p-3 rounded-full">
            <Calculator className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Discount Calculator
        </h1>
        <p className="text-center text-slate-600 mb-8">
          Discounts of 20% or more will be applied
        </p>

        <div className="space-y-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">
              Original Price ($)
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter original price"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label htmlFor="discount" className="block text-sm font-medium text-slate-700 mb-2">
              Discount Percentage (%)
            </label>
            <input
              id="discount"
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              placeholder="Enter discount percentage"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              step="0.01"
              min="0"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Calculate Final Price
          </button>

          {finalPrice !== null && (
            <div className="mt-6 p-6 bg-slate-50 rounded-lg border-2 border-slate-200">
              <div className="text-center">
                <p className="text-sm text-slate-600 mb-2">Final Price</p>
                <p className="text-4xl font-bold text-slate-800">
                  ${finalPrice.toFixed(2)}
                </p>
                <p className="text-sm text-slate-500 mt-3">
                  {discountApplied ? (
                    <span className="text-green-600 font-medium">
                      ✓ Discount applied ({discountPercent}% off)
                    </span>
                  ) : (
                    <span className="text-amber-600 font-medium">
                      No discount applied (minimum 20% required)
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
