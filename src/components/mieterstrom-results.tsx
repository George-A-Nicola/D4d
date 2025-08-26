// file: src/components/mieterstrom-results.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Sun, Euro, Calendar, RotateCcw } from 'lucide-react'
import { 
  type MieterstromResults, 
  formatCurrency, 
  formatNumber,
  getAssumptions 
} from '@/lib/mieterstrom-calculator'

interface MieterstromResultsProps {
  results: MieterstromResults
  onReset?: () => void
}

export function MieterstromResults({ results, onReset }: MieterstromResultsProps) {
  const isViable = results.roi > 0 && results.paybackPeriod < 25

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <Card className={`border-2 ${isViable ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className={`h-5 w-5 ${isViable ? 'text-green-600' : 'text-yellow-600'}`} />
            <span>Investment Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(results.totalInvestment)}
              </div>
              <div className="text-sm text-gray-600">Total Investment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {results.roi.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Annual ROI</div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">
                Payback Period: {results.paybackPeriod === Infinity ? '∞' : `${results.paybackPeriod} years`}
              </div>
            </div>
          </div>

          {isViable ? (
            <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-md">
              <p className="text-sm text-green-800 text-center font-medium">
                ✅ This project appears financially viable with a {results.roi.toFixed(1)}% annual return
              </p>
            </div>
          ) : (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800 text-center font-medium">
                ⚠️ Consider optimizing the project parameters for better returns
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* System Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sun className="h-5 w-5 text-yellow-600" />
              <span>System Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">System Size:</span>
              <span className="font-medium">{results.systemSize} kWp</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Annual Production:</span>
              <span className="font-medium">{formatNumber(results.annualProduction)} kWh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Investment Cost:</span>
              <span className="font-medium">{formatCurrency(results.totalInvestment)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Financial Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Euro className="h-5 w-5 text-green-600" />
              <span>Annual Financials</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Internal Revenue:</span>
              <span className="font-medium text-green-600">{formatCurrency(results.internalRevenue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Feed-in Revenue:</span>
              <span className="font-medium text-green-600">{formatCurrency(results.feedInRevenue)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total Revenue:</span>
              <span className="text-green-600">{formatCurrency(results.totalAnnualRevenue)}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>O&M Costs:</span>
                <span>-{formatCurrency(results.annualOMCost)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Net Profit:</span>
                <span className={results.annualProfit > 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(results.annualProfit)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tenant Electricity Sales (35% of production)</span>
              <span className="font-medium">{formatCurrency(results.internalRevenue)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ 
                  width: `${(results.internalRevenue / results.totalAnnualRevenue) * 100}%` 
                }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Grid Feed-in (65% of production)</span>
              <span className="font-medium">{formatCurrency(results.feedInRevenue)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ 
                  width: `${(results.feedInRevenue / results.totalAnnualRevenue) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assumptions */}
      <Card>
        <CardHeader>
          <CardTitle>Calculation Assumptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {Object.entries(getAssumptions()).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-600">{key}:</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reset Button */}
      {onReset && (
        <div className="text-center">
          <Button onClick={onReset} variant="outline" className="w-full md:w-auto">
            <RotateCcw className="h-4 w-4 mr-2" />
            Calculate Another Project
          </Button>
        </div>
      )}
    </div>
  )
}
