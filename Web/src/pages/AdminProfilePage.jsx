
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { User, FileText, Clock, Edit, Save, Lock, Star } from 'lucide-react'; // Added Star
import { motion } from 'framer-motion';

// Mock data
const mockUser = {
  name: "Dr. Evelyn Reed",
  email: "evelyn.reed@research.edu",
  avatarUrl: "https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60", // Placeholder
  initials: "ER",
};

const mockDocuments = [
  { id: 1, name: "Quantum_Entanglement_Review.pdf", uploadDate: "2025-04-28", status: "Processed" },
  { id: 2, name: "AI_Ethics_Framework.docx", uploadDate: "2025-04-25", status: "Processed" },
  { id: 3, name: "CV_Model_Performance.pdf", uploadDate: "2025-04-20", status: "Processing" },
];

const mockPresentations = [
  { id: 101, name: "Quantum Entanglement Slides", createdDate: "2025-04-28", rating: 5 },
  { id: 102, name: "AI Ethics Presentation", createdDate: "2025-04-25", rating: 4 },
];

const UserProfilePage = () => {
  const [user, setUser] = useState(mockUser);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();

  const handleSaveProfile = () => {
    // Add validation here if needed
    setUser({ ...user, name: editedName, email: editedEmail });
    setIsEditingProfile(false);
    toast({ title: "Profile Updated", description: "Your profile information has been saved." });
  };

  const handleChangePassword = (e) => {
     e.preventDefault();
     if (newPassword !== confirmPassword) {
       toast({ variant: "destructive", title: "Password Mismatch", description: "New passwords do not match." });
       return;
     }
     if (newPassword.length < 6) {
        toast({ variant: "destructive", title: "Password Too Short", description: "Password must be at least 6 characters long." });
       return;
     }
     // Placeholder for actual password change logic
     console.log("Changing password for:", user.email, "Current:", currentPassword, "New:", newPassword);
     toast({ title: "Password Changed", description: "Your password has been updated successfully." });
     setCurrentPassword('');
     setNewPassword('');
     setConfirmPassword('');
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-4xl mx-auto shadow-lg border-border/60 bg-card">
          <CardHeader className="flex flex-col items-center text-center space-y-4 p-6 bg-gradient-to-r from-primary/10 via-transparent to-primary/10">
            <Avatar className="w-24 h-24 border-4 border-primary/50">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="text-3xl bg-primary/20 text-primary font-semibold">{user.initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold text-primary">{user.name}</CardTitle>
              <CardDescription className="text-muted-foreground">{user.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile"><User className="w-4 h-4 mr-2 inline" />Profile</TabsTrigger>
                <TabsTrigger value="documents"><FileText className="w-4 h-4 mr-2 inline" />Documents</TabsTrigger>
                <TabsTrigger value="presentations"><FileText className="w-4 h-4 mr-2 inline" />Presentations</TabsTrigger>
                <TabsTrigger value="security"><Lock className="w-4 h-4 mr-2 inline" />Security</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Personal Information</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => setIsEditingProfile(!isEditingProfile)}>
                      {isEditingProfile ? <Save className="w-5 h-5 text-primary" /> : <Edit className="w-5 h-5 text-muted-foreground" />}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditingProfile ? (
                      <>
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
                        </div>
                         <Button onClick={handleSaveProfile} className="mt-2">Save Changes</Button>
                      </>
                    ) : (
                      <>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="mt-6">
                 <Card>
                   <CardHeader>
                     <CardTitle>Uploaded Documents</CardTitle>
                     <CardDescription>Manage your uploaded papers.</CardDescription>
                   </CardHeader>
                   <CardContent>
                     {mockDocuments.length > 0 ? (
                       <ul className="space-y-3">
                         {mockDocuments.map(doc => (
                           <li key={doc.id} className="flex justify-between items-center p-3 border rounded-md bg-secondary/30 hover:bg-secondary/50 transition-colors">
                             <div className="flex items-center space-x-3">
                               <FileText className="w-5 h-5 text-primary" />
                               <span>{doc.name}</span>
                             </div>
                             <div className="text-sm text-muted-foreground space-x-4">
                               <span>{doc.uploadDate}</span>
                               <span className={`px-2 py-0.5 rounded-full text-xs ${doc.status === 'Processed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                 {doc.status}
                               </span>
                             </div>
                           </li>
                         ))}
                       </ul>
                     ) : (
                       <p className="text-center text-muted-foreground">No documents uploaded yet.</p>
                     )}
                   </CardContent>
                 </Card>
              </TabsContent>

              {/* Presentations Tab */}
              <TabsContent value="presentations" className="mt-6">
                 <Card>
                   <CardHeader>
                     <CardTitle>Generated Presentations</CardTitle>
                     <CardDescription>View and manage your generated slides.</CardDescription>
                   </CardHeader>
                   <CardContent>
                     {mockPresentations.length > 0 ? (
                       <ul className="space-y-3">
                         {mockPresentations.map(pres => (
                           <li key={pres.id} className="flex justify-between items-center p-3 border rounded-md bg-secondary/30 hover:bg-secondary/50 transition-colors">
                             <div className="flex items-center space-x-3">
                               <FileText className="w-5 h-5 text-primary" />
                               <span>{pres.name}</span>
                             </div>
                             <div className="text-sm text-muted-foreground space-x-4">
                               <span>Created: {pres.createdDate}</span>
                               <span className="flex items-center">
                                 Rating: {pres.rating} <Star className="w-4 h-4 ml-1 text-yellow-400 fill-yellow-400" />
                               </span>
                               <Button variant="link" size="sm" className="p-0 h-auto">View</Button>
                             </div>
                           </li>
                         ))}
                       </ul>
                     ) : (
                       <p className="text-center text-muted-foreground">No presentations generated yet.</p>
                     )}
                   </CardContent>
                 </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="mt-6">
                 <Card>
                   <CardHeader>
                     <CardTitle>Change Password</CardTitle>
                   </CardHeader>
                   <CardContent>
                     <form onSubmit={handleChangePassword} className="space-y-4">
                       <div>
                         <Label htmlFor="currentPassword">Current Password</Label>
                         <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                       </div>
                       <div>
                         <Label htmlFor="newPassword">New Password</Label>
                         <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                       </div>
                       <div>
                         <Label htmlFor="confirmPassword">Confirm New Password</Label>
                         <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                       </div>
                       <Button type="submit">Update Password</Button>
                     </form>
                   </CardContent>
                 </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserProfilePage;
  