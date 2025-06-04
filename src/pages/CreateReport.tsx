import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Save, FileUp, FilePlus } from "lucide-react";

export default function CreateReport() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  
  const isEditing = Boolean(editId);
  const [activeTab, setActiveTab] = useState("details");
  
  const handleSaveDraft = () => {
    toast({
      title: "Report saved as draft",
      description: "Your report has been saved successfully.",
    });
    navigate("/");
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report generated",
      description: "Your report has been generated successfully.",
    });
    // Simulate report generation and navigate to view
    const newReportId = editId || `rep-${Math.floor(Math.random() * 1000)}`;
    navigate(`/view/${newReportId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditing ? "Edit Report" : "Create New Report"}
        </h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="data">Data Source</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Report Details</CardTitle>
              <CardDescription>
                Enter the basic information for your report.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Report Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter report title" 
                  defaultValue={isEditing ? "Product Performance Analysis" : ""}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Report Type</Label>
                <Select defaultValue={isEditing ? "Analytics" : ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Financial">Financial</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                    <SelectItem value="Survey">Survey</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter report description" 
                  rows={4}
                  defaultValue={isEditing ? "Analysis of product performance metrics across different regions." : ""}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button onClick={() => setActiveTab("content")}>
                Continue
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Report Content</CardTitle>
              <CardDescription>
                Define the sections and content for your report.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Sections</Label>
                <div className="border rounded-md p-4 space-y-4">
                  <div className="p-3 border rounded-md bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Executive Summary</h3>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <p className="text-sm text-gray-500">Brief overview of key findings and metrics.</p>
                  </div>
                  
                  <div className="p-3 border rounded-md bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Data Analysis</h3>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <p className="text-sm text-gray-500">Detailed analysis of the collected data.</p>
                  </div>
                  
                  <div className="p-3 border rounded-md bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Recommendations</h3>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <p className="text-sm text-gray-500">Actionable recommendations based on the analysis.</p>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <FilePlus className="h-4 w-4 mr-2" />
                    Add Section
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("details")}>
                Back
              </Button>
              <Button onClick={() => setActiveTab("data")}>
                Continue
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Data Source</CardTitle>
              <CardDescription>
                Choose the data source for your report.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input type="radio" id="upload" name="dataSource" value="upload" className="h-4 w-4" />
                  <Label htmlFor="upload">Upload Data File</Label>
                </div>
                
                <div className="ml-6 p-4 border border-dashed rounded-md flex flex-col items-center justify-center">
                  <FileUp className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Drag and drop your file here, or click to browse</p>
                  <p className="text-xs text-gray-400">Supports CSV, Excel, and JSON formats</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Browse Files
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2 mt-4">
                  <input type="radio" id="api" name="dataSource" value="api" className="h-4 w-4" />
                  <Label htmlFor="api">Connect API</Label>
                </div>
                
                <div className="flex items-center space-x-2 mt-4">
                  <input type="radio" id="manual" name="dataSource" value="manual" className="h-4 w-4" defaultChecked />
                  <Label htmlFor="manual">Manual Entry</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("content")}>
                Back
              </Button>
              <Button onClick={() => setActiveTab("preview")}>
                Continue
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Report Preview</CardTitle>
              <CardDescription>
                Preview your report before generating it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6 bg-white">
                <h2 className="text-2xl font-bold mb-4">{isEditing ? "Product Performance Analysis" : "New Report"}</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Executive Summary</h3>
                  <p className="text-gray-700">
                    This report provides an analysis of product performance across different regions.
                    Key metrics indicate a 15% growth in market share and a 12% increase in customer satisfaction.
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Data Analysis</h3>
                  <p className="text-gray-700">
                    Our analysis shows strong performance in the Western region with 22% growth,
                    while the Eastern region shows moderate growth at 9%. Southern markets are
                    underperforming with only 4% growth year-over-year.
                  </p>
                  <div className="h-40 bg-gray-100 rounded-md mt-3 flex items-center justify-center">
                    [Chart Placeholder]
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Increase marketing budget for Southern region by 15%</li>
                    <li>Launch customer retention program in Eastern region</li>
                    <li>Expand product line in Western region to capitalize on growth</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setActiveTab("data")}>
                  Back
                </Button>
                <Button variant="secondary" onClick={handleSaveDraft}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
              </div>
              <Button onClick={handleGenerateReport}>
                Generate Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}