import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Printer, Share2, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ViewReport() {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, this would be fetched from an API
  const reportTitle = "Product Performance Analysis";
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {reportTitle}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Product Performance Analysis</h1>
              <p className="text-gray-500">Generated on April 24, 2025</p>
              <div className="mt-2 flex justify-center">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  Report ID: {id}
                </span>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Executive Summary</h2>
              <p className="mb-4">
                This comprehensive report analyzes the performance of our product line across various markets
                and customer segments. The data shows significant growth in key areas while highlighting
                opportunities for improvement in others.
              </p>
              <p>
                Overall, we've seen a 15% increase in market share and a 12% improvement in customer
                satisfaction scores compared to the previous quarter.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Data Analysis</h2>
              
              <h3 className="text-lg font-medium mt-6 mb-3">Regional Performance</h3>
              <p className="mb-4">
                Our analysis indicates strong performance in the Western region with 22% growth,
                while the Eastern region shows moderate growth at 9%. Southern markets are
                underperforming with only 4% growth year-over-year.
              </p>
              
              <div className="bg-gray-100 rounded-lg p-4 mb-6 h-64 flex items-center justify-center">
                [Regional Performance Chart]
              </div>
              
              <h3 className="text-lg font-medium mt-6 mb-3">Product Category Performance</h3>
              <p className="mb-4">
                The Premium product line continues to be our strongest performer with 27% growth.
                Standard products grew by 14%, while Economy products showed only 5% growth.
                This suggests a market shift toward higher-quality offerings.
              </p>
              
              <div className="bg-gray-100 rounded-lg p-4 mb-6 h-64 flex items-center justify-center">
                [Product Category Chart]
              </div>
              
              <h3 className="text-lg font-medium mt-6 mb-3">Customer Segments</h3>
              <p>
                Enterprise customers showed the highest adoption rate at 32%, followed by mid-market
                at 18% and small business at 11%. This aligns with our strategic focus on expanding
                enterprise relationships.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Recommendations</h2>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <strong>Southern Region Focus:</strong> Increase marketing budget for the Southern
                  region by 15% to address underperformance. Consider targeted promotions and 
                  partnerships with regional retailers.
                </li>
                <li>
                  <strong>Eastern Customer Retention:</strong> Launch a customer retention program 
                  in the Eastern region to improve loyalty and increase repeat purchases.
                </li>
                <li>
                  <strong>Western Region Expansion:</strong> Expand the Premium product line in the 
                  Western region to capitalize on strong growth and consumer preference for 
                  high-quality products.
                </li>
                <li>
                  <strong>Product Development:</strong> Invest in enhancing the Standard product line 
                  to close the gap with Premium offerings while maintaining competitive pricing.
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Conclusion</h2>
              <p>
                The data presents a clear opportunity to realign resources to better serve our
                growing markets while addressing challenges in underperforming regions. By implementing
                the recommendations outlined in this report, we project an additional 8-10% growth
                in the next quarter.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}