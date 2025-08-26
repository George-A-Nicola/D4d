export interface MieterstromInputs {
  roofSize: number; // m²
  apartments: number;
  annualDemand: number; // kWh/year
  address?: string; // Optional label
}

export interface MieterstromResults {
  systemSize: number; // kWp
  totalInvestment: number; // €
  annualProduction: number; // kWh/year
  internalRevenue: number; // €/year
  feedInRevenue: number; // €/year
  totalAnnualRevenue: number; // €/year
  annualOMCost: number; // €/year
  annualProfit: number; // €/year
  paybackPeriod: number; // years
  roi: number; // %
}

// Fixed assumptions as per requirements
const ASSUMPTIONS = {
  SYSTEM_COST_PER_KWP: 1000, // €/kWp
  SOLAR_YIELD_PER_KWP: 950, // kWh/kWp/year
  TENANT_ELECTRICITY_PRICE: 0.30, // €/kWh
  GRID_FEED_IN_TARIFF: 0.08, // €/kWh
  INTERNAL_CONSUMPTION_RATE: 0.35, // 35%
  GRID_FEED_IN_RATE: 0.65, // 65%
  ANNUAL_OM_RATE: 0.01, // 1% of investment
  ROOF_EFFICIENCY: 5, // m²/kWp
}

/**
 * Calculate Mieterstrom profitability based on building parameters
 */
export function calculateMieterstrom(inputs: MieterstromInputs): MieterstromResults {
  // 1. System size (kWp) based on roof size
  const systemSize = inputs.roofSize / ASSUMPTIONS.ROOF_EFFICIENCY;
  
  // 2. Total investment cost
  const totalInvestment = systemSize * ASSUMPTIONS.SYSTEM_COST_PER_KWP;
  
  // 3. Annual solar production
  const annualProduction = systemSize * ASSUMPTIONS.SOLAR_YIELD_PER_KWP;
  
  // 4. Revenue calculations
  const internalConsumption = annualProduction * ASSUMPTIONS.INTERNAL_CONSUMPTION_RATE;
  const gridFeedIn = annualProduction * ASSUMPTIONS.GRID_FEED_IN_RATE;
  
  const internalRevenue = internalConsumption * ASSUMPTIONS.TENANT_ELECTRICITY_PRICE;
  const feedInRevenue = gridFeedIn * ASSUMPTIONS.GRID_FEED_IN_TARIFF;
  const totalAnnualRevenue = internalRevenue + feedInRevenue;
  
  // 5. Costs
  const annualOMCost = totalInvestment * ASSUMPTIONS.ANNUAL_OM_RATE;
  
  // 6. Profit calculations
  const annualProfit = totalAnnualRevenue - annualOMCost;
  
  // 7. Financial metrics
  const paybackPeriod = annualProfit > 0 ? totalInvestment / annualProfit : Infinity;
  const roi = totalInvestment > 0 ? (annualProfit / totalInvestment) * 100 : 0;
  
  return {
    systemSize: Math.round(systemSize * 100) / 100, // Round to 2 decimal places
    totalInvestment: Math.round(totalInvestment),
    annualProduction: Math.round(annualProduction),
    internalRevenue: Math.round(internalRevenue),
    feedInRevenue: Math.round(feedInRevenue),
    totalAnnualRevenue: Math.round(totalAnnualRevenue),
    annualOMCost: Math.round(annualOMCost),
    annualProfit: Math.round(annualProfit),
    paybackPeriod: Math.round(paybackPeriod * 10) / 10, // Round to 1 decimal place
    roi: Math.round(roi * 100) / 100, // Round to 2 decimal places
  };
}

/**
 * Validate inputs and return errors if any
 */
export function validateInputs(inputs: Partial<MieterstromInputs>): string[] {
  const errors: string[] = [];
  
  if (!inputs.roofSize || inputs.roofSize <= 0) {
    errors.push('Roof size must be greater than 0 m²');
  }
  
  if (!inputs.apartments || inputs.apartments <= 0) {
    errors.push('Number of apartments must be greater than 0');
  }
  
  if (!inputs.annualDemand || inputs.annualDemand <= 0) {
    errors.push('Annual electricity demand must be greater than 0 kWh');
  }
  
  return errors;
}

/**
 * Format currency values for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format numbers with thousand separators
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('de-DE').format(value);
}

/**
 * Get assumptions for display
 */
export function getAssumptions() {
  return {
    'Solar yield': `${ASSUMPTIONS.SOLAR_YIELD_PER_KWP} kWh/kWp/year`,
    'System cost': `${formatCurrency(ASSUMPTIONS.SYSTEM_COST_PER_KWP)}/kWp`,
    'Roof efficiency': `${ASSUMPTIONS.ROOF_EFFICIENCY} m²/kWp`,
    'Tenant electricity price': `${ASSUMPTIONS.TENANT_ELECTRICITY_PRICE} €/kWh`,
    'Grid feed-in tariff': `${ASSUMPTIONS.GRID_FEED_IN_TARIFF} €/kWh`,
    'Internal consumption': `${ASSUMPTIONS.INTERNAL_CONSUMPTION_RATE * 100}%`,
    'Grid feed-in': `${ASSUMPTIONS.GRID_FEED_IN_RATE * 100}%`,
    'Annual O&M cost': `${ASSUMPTIONS.ANNUAL_OM_RATE * 100}% of investment`,
  };
}
