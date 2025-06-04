import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, FileText, Bookmark, Star, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

// Sample templates data
const templates = [
  {
    id: "template-1",
    title: "Financial Report",
    description: "Comprehensive financial statement with balance sheet, income statement, and cash flow analysis.",
    category: "Finance",
    popular: true,
  },
  {
    id: "template-2",
    title: "Marketing Campaign Analysis",
    description: "Analyze marketing campaign performance with engagement metrics and conversion rates.",
    category: "Marketing",
    popular: false,
  },
  {
    id: "template-3",
    title: "Product Performance",
    description: "Track product performance across regions with sales metrics and customer feedback.",
    category: "Sales",
    popular: true,
  },
  {
    id: "template-4",
    title: "Customer Satisfaction Survey",
    description: "Structured survey report with satisfaction scores and actionable feedback analysis.",
    category: "Customer",
    popular: false,
  },
  {
    id: "template-5",
    title: "Project Status Report",
    description: "Track project progress, milestones, resources, and risks in a comprehensive format.",
    category: "Project Management",
    popular: true,
  },
  {
    id: "template-6",
    title: "Employee Performance Review",
    description: "Structured performance evaluation with goals, achievements, and development plans.",
    category: "HR",
    popular: false,
  },
];

export default function ReportTemplates() {
  const { toast } = useToast();

  const handleUseTemplate = (templateId: string) => {
    toast({
      title: "Template selected",
      description: "Creating a new report with this template.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Report Templates</h1>
        <Button asChild>
          <Link to="/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Custom Template
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle>{template.title}</CardTitle>
                {template.popular && (
                  <Badge className="bg-amber-500">
                    <Star className="h-3 w-3 mr-1" /> Popular
                  </Badge>
                )}
              </div>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <FileText className="h-4 w-4 mr-1" />
                <span className="mr-4">{template.category}</span>
                <Bookmark className="h-4 w-4 mr-1" />
                <span>Template</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <Button variant="ghost" size="sm" onClick={() => {
                toast({
                  title: "Template duplicated",
                  description: "A copy has been added to your templates.",
                });
              }}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </Button>
              <Button size="sm" asChild>
                <Link to={`/create?template=${template.id}`} onClick={() => handleUseTemplate(template.id)}>
                  Use Template
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}