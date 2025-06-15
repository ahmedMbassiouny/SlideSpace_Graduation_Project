
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, FileText, BarChart2, Search, Trash2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data
const mockUsers = [
  { id: 1, name: "Dr. Evelyn Reed", email: "evelyn.reed@research.edu", joinDate: "2025-03-15", uploads: 5 },
  { id: 2, name: "Prof. Kenji Tanaka", email: "k.tanaka@university.ac.jp", joinDate: "2025-04-01", uploads: 2 },
  { id: 3, name: "Aisha Khan", email: "aisha.k@techcorp.com", joinDate: "2025-04-10", uploads: 8 },
  { id: 4, name: "Dr. Ben Carter", email: "ben.carter@lab.org", joinDate: "2025-04-22", uploads: 1 },
];

const mockContent = [
 { id: 101, type: "Paper", title: "Quantum_Entanglement_Review.pdf", uploader: "Dr. Evelyn Reed", date: "2025-04-28", status: "Active" },
 { id: 102, type: "Presentation", title: "AI Ethics Presentation", uploader: "Prof. Kenji Tanaka", date: "2025-04-25", status: "Active" },
 { id: 201, type: "Paper", title: "CV_Model_Performance.pdf", uploader: "Aisha Khan", date: "2025-04-20", status: "Flagged" },
 { id: 202, type: "Presentation", title: "Intro to ML Slides", uploader: "Dr. Ben Carter", date: "2025-04-23", status: "Active" },
];

const AdminDashboardPage = () => {
  // Basic state for search filters (can be expanded)
  const [userSearch, setUserSearch] = React.useState('');
  const [contentSearch, setContentSearch] = React.useState('');

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredContent = mockContent.filter(item =>
    item.title.toLowerCase().includes(contentSearch.toLowerCase()) ||
    item.uploader.toLowerCase().includes(contentSearch.toLowerCase())
  );

  const handleDeleteUser = (userId) => {
    console.log("Deleting user:", userId);
    // Add actual delete logic + confirmation
  };

  const handleDeleteContent = (contentId) => {
     console.log("Deleting content:", contentId);
     // Add actual delete logic + confirmation
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.h1
        className="text-3xl font-bold text-center mb-8 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Dashboard
      </motion.h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview"><BarChart2 className="w-4 h-4 mr-2 inline" />Overview & Analytics</TabsTrigger>
          <TabsTrigger value="users"><Users className="w-4 h-4 mr-2 inline" />User Management</TabsTrigger>
          <TabsTrigger value="content"><FileText className="w-4 h-4 mr-2 inline" />Content Management</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>Key metrics and usage statistics.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{mockUsers.length}</p>
                  </CardContent>
                </Card>
                 <Card className="bg-secondary/20 border-secondary/40">
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary-foreground">Total Uploads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{mockContent.filter(c => c.type === 'Paper').length}</p>
                  </CardContent>
                </Card>
                 <Card className="bg-accent/20 border-accent/40">
                  <CardHeader>
                    <CardTitle className="text-lg text-accent-foreground">Generated Presentations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{mockContent.filter(c => c.type === 'Presentation').length}</p>
                  </CardContent>
                </Card>
                {/* Add more charts/stats here - Placeholder */}
                <div className="md:col-span-3 mt-4 p-6 border rounded-lg text-center text-muted-foreground">
                  <BarChart2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  Detailed charts and analytics coming soon.
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="users">
           <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Manage Users</CardTitle>
                <div className="relative mt-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users by name or email..."
                    className="pl-8 w-full md:w-1/2"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                      <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Join Date</th>
                        <th scope="col" className="px-6 py-3">Uploads</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(user => (
                        <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">{user.name}</td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4">{user.joinDate}</td>
                          <td className="px-6 py-4">{user.uploads}</td>
                          <td className="px-6 py-4 space-x-2">
                             <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800">
                               <Eye className="w-4 h-4" />
                             </Button>
                             <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-800" onClick={() => handleDeleteUser(user.id)}>
                               <Trash2 className="w-4 h-4" />
                             </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                 {filteredUsers.length === 0 && <p className="text-center mt-4 text-muted-foreground">No users found.</p>}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Content Management Tab */}
        <TabsContent value="content">
           <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Manage Content</CardTitle>
                 <div className="relative mt-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search content by title or uploader..."
                    className="pl-8 w-full md:w-1/2"
                    value={contentSearch}
                    onChange={(e) => setContentSearch(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                 <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                      <tr>
                        <th scope="col" className="px-6 py-3">Type</th>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Uploader</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContent.map(item => (
                        <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4">{item.type}</td>
                          <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">{item.title}</td>
                          <td className="px-6 py-4">{item.uploader}</td>
                          <td className="px-6 py-4">{item.date}</td>
                           <td className="px-6 py-4">
                             <span className={`px-2 py-0.5 rounded-full text-xs ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                               {item.status}
                             </span>
                           </td>
                          <td className="px-6 py-4 space-x-2">
                             <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800">
                               <Eye className="w-4 h-4" />
                             </Button>
                             <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-800" onClick={() => handleDeleteContent(item.id)}>
                               <Trash2 className="w-4 h-4" />
                             </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredContent.length === 0 && <p className="text-center mt-4 text-muted-foreground">No content found.</p>}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboardPage;
  