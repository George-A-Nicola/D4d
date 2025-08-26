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
  return (
    <div className="space-y-6">
      {/* Row 1: Annual Financials + System Details */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Annual Financials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Euro className="h-5 w-5 text-green-600" />
              <span>Annual Financials</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 mb-3">Revenue</h4>
              <div className="flex justify-between">
                <span className="text-gray-600">Internal Sales:</span>
                <span className="font-medium text-green-600">{formatCurrency(results.internalRevenue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Grid Feed-in:</span>
                <span className="font-medium text-green-600">{formatCurrency(results.feedInRevenue)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total Revenue:</span>
                <span className="text-green-600">{formatCurrency(results.totalAnnualRevenue)}</span>
              </div>
              
              <h4 className="font-medium text-gray-900 mb-3 mt-6">Costs & Profit</h4>
              <div className="flex justify-between">
                <span className="text-gray-600">O&M Costs:</span>
                <span className="font-medium text-red-600">-{formatCurrency(results.annualOMCost)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Net Profit:</span>
                <span className={results.annualProfit > 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(results.annualProfit)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sun className="h-5 w-5 text-yellow-600" />
              <span>System Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">System Size:</span>
                <span className="text-xl font-bold text-gray-900">{results.systemSize} kWp</span>
              </div>
              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                <span className="text-gray-600">Annual Production:</span>
                <span className="text-xl font-bold text-gray-900">{formatNumber(results.annualProduction)} kWh</span>
              </div>
              <div className="flex justify-between items-center py-2 border-t border-gray-100">
                <span className="text-gray-600">Investment Cost:</span>
                <span className="text-xl font-bold text-gray-900">{formatCurrency(results.totalInvestment)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Row 3: Calculation Assumptions */}
      <Card>
        <CardHeader>
          <CardTitle>Calculation Assumptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-y-3 text-sm">
            {Object.entries(getAssumptions()).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-1">
                <span className="text-gray-600">{key}:</span>
                <span className="font-medium text-right">{value}</span>
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
