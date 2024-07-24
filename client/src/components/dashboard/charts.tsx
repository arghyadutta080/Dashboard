import React from 'react'
import SalesBarChart from './BarGraph'
import ProductsPieChart from './PieChart'

const Charts: React.FC = () => {
    return (
      <>
        <div className="p-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <h2 className="block text-center text-2xl font-bold mb-4">Sales Chart</h2>
            <SalesBarChart />
          </div>
          <div className="flex-1 p-2">
            <h2 className="block text-center text-2xl font-bold mb-4">Products Chart</h2>
            <ProductsPieChart/>
          </div>
        </div>
      </>
    )
}

export default Charts;