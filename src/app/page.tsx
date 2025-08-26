'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calculator, Zap, Building2, Euro } from 'lucide-react'
import { MieterstromForm } from '@/components/mieterstrom-form'
import { MieterstromResults } from '@/components/mieterstrom-results'
import { type MieterstromInputs, type MieterstromResults as ResultsType, calculateMieterstrom } from '@/lib/mieterstrom-calculator'

export default function MieterstromCalculatorPage() {
  const [results, setResults] = useState<ResultsType | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleCalculate = (inputs: MieterstromInputs) => {
    const calculatedResults = calculateMieterstrom(inputs)
    setResults(calculatedResults)
    setShowResults(true)
  }

  const handleReset = () => {
    setResults(null)
    setShowResults(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Mieterstrom Profitability Calculator
              </h1>
              <p className="text-gray-600 text-sm">
                Estimate the profitability of solar energy solutions for apartment buildings
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Calculate Your Solar Investment Return
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enter your building details below to get an instant profitability analysis 
              for your Mieterstrom solar project.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Building2 className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Building Assessment</h3>
                <p className="text-sm text-gray-600">
                  Analyze your building's solar potential and electricity needs
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Calculator className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Instant Calculation</h3>
                <p className="text-sm text-gray-600">
                  Get immediate ROI and payback period calculations
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Euro className="h-10 w-10 text-amber-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Investment Analysis</h3>
                <p className="text-sm text-gray-600">
                  Comprehensive cost-benefit analysis for informed decisions
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Calculator Section - Consistent Layout */}
          <div className="space-y-8">
            {/* Top Row: Always maintain Project Details + Profitability Analysis side-by-side */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <div>
                <MieterstromForm onCalculate={handleCalculate} />
                {showResults && (
                  <div className="mt-4">
                    <Button 
                      onClick={handleReset} 
                      variant="outline" 
                      className="w-full"
                    >
                      Calculate Another Project
                    </Button>
                  </div>
                )}
              </div>

              {/* Profitability Analysis Area */}
              <div>
                {!showResults ? (
                  // Results Placeholder
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Zap className="h-5 w-5" />
                        <span>Profitability Analysis</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <Calculator className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Enter your project details to see the profitability analysis
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  // Investment Summary + Revenue Sources (stacked in right column)
                  <div className="space-y-6">
                    {/* Investment Summary */}
                    <Card className={`border-2 ${results && results.roi > 0 && results.paybackPeriod < 25 ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Zap className={`h-5 w-5 ${results && results.roi > 0 && results.paybackPeriod < 25 ? 'text-green-600' : 'text-yellow-600'}`} />
                          <span>Investment Summary</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">
                              {results ? `€${Math.round(results.totalInvestment).toLocaleString()}` : '€0'}
                            </div>
                            <div className="text-sm text-gray-600">Total Investment</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {results ? `${results.roi.toFixed(1)}%` : '0%'}
                            </div>
                            <div className="text-sm text-gray-600">Annual ROI</div>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="text-center">
                            <div className="text-lg font-semibold text-gray-900">
                              Payback Period: {results && results.paybackPeriod === Infinity ? '∞' : `${results?.paybackPeriod || 0} years`}
                            </div>
                          </div>
                        </div>

                        {results && results.roi > 0 && results.paybackPeriod < 25 ? (
                          <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-md">
                            <p className="text-sm text-green-800 text-center font-medium">
                              ✅ This project appears financially viable with a {results.roi.toFixed(1)}% annual return
                            </p>
                          </div>
                        ) : results ? (
                          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-200 rounded-md">
                            <p className="text-sm text-yellow-800 text-center font-medium">
                              ⚠️ Consider optimizing the project parameters for better returns
                            </p>
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>

                    {/* Revenue Sources */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Revenue Sources</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-600">Tenant Electricity Sales</span>
                              <span className="font-medium">€{results ? Math.round(results.internalRevenue).toLocaleString() : '0'}</span>
                            </div>
                            <div className="text-xs text-gray-500 mb-2">35% of production sold to tenants at €0.30/kWh</div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-green-600 h-3 rounded-full flex items-center justify-center" 
                                style={{ 
                                  width: results ? `${(results.internalRevenue / results.totalAnnualRevenue) * 100}%` : '0%'
                                }}
                              >
                                <span className="text-xs text-white font-medium">
                                  {results ? Math.round((results.internalRevenue / results.totalAnnualRevenue) * 100) : 0}%
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-600">Grid Feed-in Revenue</span>
                              <span className="font-medium">€{results ? Math.round(results.feedInRevenue).toLocaleString() : '0'}</span>
                            </div>
                            <div className="text-xs text-gray-500 mb-2">65% of production fed into grid at €0.08/kWh</div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-blue-600 h-3 rounded-full flex items-center justify-center" 
                                style={{ 
                                  width: results ? `${(results.feedInRevenue / results.totalAnnualRevenue) * 100}%` : '0%'
                                }}
                              >
                                <span className="text-xs text-white font-medium">
                                  {results ? Math.round((results.feedInRevenue / results.totalAnnualRevenue) * 100) : 0}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Results Sections - Only show when results exist */}
            {showResults && results && (
              <MieterstromResults results={results} />
            )}
          </div>

          {/* Assumptions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Calculation Assumptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">System Parameters</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Solar yield: 950 kWh/kWp/year</li>
                    <li>• System cost: €1,000/kWp</li>
                    <li>• Roof efficiency: 5 m²/kWp</li>
                    <li>• Solar coverage: 35% of demand</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Economic Parameters</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Tenant electricity price: €0.30/kWh</li>
                    <li>• Grid feed-in tariff: €0.08/kWh</li>
                    <li>• Internal consumption: 35%</li>
                    <li>• Grid feed-in: 65%</li>
                    <li>• Annual O&M: 1% of investment</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">
            Mieterstrom Profitability Calculator - D4D
          </p>
        </div>
      </footer>
    </div>
  )
}
