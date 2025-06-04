import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileEdit } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data for demonstration
const recentReports = [
  { 
    id: "rep-001", 
    title: "Q1 Financial Summary", 
    type: "Financial", 
    date: "2025-04-01", 
    status: "completed" 
  },
  { 
    id: "rep-002", 
    title: "Marketing Campaign Results", 
    type: "Marketing", 
    date: "2025-04-10", 
    status: "completed" 
  },
  { 
    id: "rep-003", 
    title: "Product Performance Analysis", 
    type: "Analytics", 
    date: "2025-04-15", 
    status: "in-progress" 
  },
  { 
    id: "rep-004", 
    title: "Customer Satisfaction Survey", 
    type: "Survey", 
    date: "2025-04-18", 
    status: "draft" 
  },
];

export default function RecentReports() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
        <CardDescription>
          View and manage your recently created reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.title}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <StatusBadge status={report.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link to={`/view/${report.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Link>
                    </Button>
                    {report.status === "completed" && (
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    )}
                    {report.status !== "completed" && (
                      <Button variant="outline" size="icon" asChild>
                        <Link to={`/create?edit=${report.id}`}>
                          <FileEdit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-500">Completed</Badge>;
    case "in-progress":
      return <Badge className="bg-blue-500">In Progress</Badge>;
    case "draft":
      return <Badge variant="outline">Draft</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}