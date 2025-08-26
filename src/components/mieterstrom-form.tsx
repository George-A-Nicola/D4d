// file: src/components/mieterstrom-form.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator } from 'lucide-react'
import { type MieterstromInputs, validateInputs } from '@/lib/mieterstrom-calculator'

interface MieterstromFormProps {
  onCalculate: (inputs: MieterstromInputs) => void
}

export function MieterstromForm({ onCalculate }: MieterstromFormProps) {
  const [inputs, setInputs] = useState({
    roofSize: '',
    apartments: '',
    annualDemand: '',
    address: '',
  })
  const [errors, setErrors] = useState<string[]>([])

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }))
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Convert string inputs to numbers for validation
    const numericInputs = {
      roofSize: Number(inputs.roofSize),
      apartments: Number(inputs.apartments),
      annualDemand: Number(inputs.annualDemand),
      address: inputs.address || '',
    }
    
    const validationErrors = validateInputs(numericInputs)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    // Create final input object with proper types
    const finalInputs: MieterstromInputs = {
      roofSize: numericInputs.roofSize,
      apartments: numericInputs.apartments,
      annualDemand: numericInputs.annualDemand,
      address: numericInputs.address,
    }

    onCalculate(finalInputs)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="h-5 w-5 text-green-600" />
          <span>Project Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Address (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="address">Building Address (Optional)</Label>
            <Input
              id="address"
              type="text"
              placeholder="e.g., Musterstraße 123, Berlin"
              value={inputs.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </div>

          {/* Roof Size */}
          <div className="space-y-2">
            <Label htmlFor="roofSize">
              Roof Size (m²) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="roofSize"
              type="number"
              min="1"
              step="1"
              placeholder="e.g., 200"
              value={inputs.roofSize}
              onChange={(e) => handleInputChange('roofSize', e.target.value)}
            />
          </div>

          {/* Number of Apartments */}
          <div className="space-y-2">
            <Label htmlFor="apartments">
              Number of Apartments <span className="text-red-500">*</span>
            </Label>
            <Input
              id="apartments"
              type="number"
              min="1"
              step="1"
              placeholder="e.g., 12"
              value={inputs.apartments}
              onChange={(e) => handleInputChange('apartments', e.target.value)}
            />
          </div>

          {/* Annual Electricity Demand */}
          <div className="space-y-2">
            <Label htmlFor="annualDemand">
              Annual Electricity Demand (kWh/year) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="annualDemand"
              type="number"
              min="1"
              step="100"
              placeholder="e.g., 48000"
              value={inputs.annualDemand}
              onChange={(e) => handleInputChange('annualDemand', e.target.value)}
            />
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <h4 className="text-sm font-medium text-red-800 mb-1">
                Please correct the following errors:
              </h4>
              <ul className="text-sm text-red-700 list-disc list-inside">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Calculate Profitability
          </Button>
        </form>

        {/* Helper Text */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <h4 className="text-sm font-medium text-blue-800 mb-1">Quick Estimate:</h4>
          <p className="text-sm text-blue-700">
            For a typical apartment building, consider ~4,000 kWh/year per apartment 
            for electricity demand.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}