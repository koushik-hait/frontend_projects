import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Mail,
  Edit,
  Users,
  Image as ImageIcon,
} from "lucide-react";
import withAuth from "@/components/WithAuth";
import { useAuthStore } from "@/lib/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { expressApi } from "@/lib/axios-conf";
import { IPayload, IResponse, IUser, IUserProfile } from "@/types";

function UserList({
  users,
  title,
}: {
  users: { id: string; username: string; avatarUrl: string }[];
  title: string;
}) {
  return (
    <div className="w-full max-w-md max-h-96 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user.avatarUrl} alt={user.username} />
              <AvatarFallback>
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EditProfileForm({
  profile,
  onClose,
}: {
  profile: IUserProfile<IUser>;
  onClose: () => void;
}) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" defaultValue={profile.firstName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" defaultValue={profile.lastName} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" defaultValue={profile.bio} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" defaultValue={profile.address} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" defaultValue={profile.phoneNumber} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input id="city" defaultValue={profile.city} />
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
}

function ProfilePage() {
  const [isEditingCover, setIsEditingCover] = useState(false);
  const { user } = useAuthStore();

  const getCurrentUser = async () => {
    const { data } = await expressApi.get<
      IResponse<IPayload<IUserProfile<IUser>[]>>
    >(`/blog/profile/current-user`);
    return data.data;
  };

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["current-profile"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 60 * 24 * 7,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });

  const userProfile = data?.data[0];

  const handleCoverImageUpdate = () => {
    // Handle cover image update logic here
    setIsEditingCover(false);
  };

  return (
    <div className="w-full h-screen relative mx-4 p-4">
      <Card className="w-full max-w-7xl mx-auto min-h-7xl">
        <div className="relative">
          <img
            src={userProfile?.coverImage.url}
            alt="Profile cover"
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => setIsEditingCover(true)}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Edit Cover
          </Button>
          <Avatar className="absolute bottom-0 left-4 transform translate-y-1/2 w-24 h-24 border-4 border-white">
            <AvatarImage
              src={userProfile?.account.avatar.url}
              alt={userProfile?.account.username}
            />
            <AvatarFallback>
              {userProfile?.account.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardContent className="pt-16 pb-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {userProfile?.account.username}
                {userProfile?.account.isEmailVerified && (
                  <Badge variant="secondary" className="ml-2">
                    <CheckCircle className="w-3 h-3 mr-1 fill-blue-700" />
                    Verified
                  </Badge>
                )}
              </h1>
              <p className="text-muted-foreground flex items-center mt-1">
                <Mail className="w-4 h-4 mr-2" />
                {userProfile?.account.email}
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2 fill-green-700" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <EditProfileForm profile={userProfile!} onClose={() => {}} />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-4 mb-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <Users className="w-4 h-4 mr-2 fill-zinc-700" />
                  {userProfile?.followers.toLocaleString()} Followers
                </Button>
              </DialogTrigger>
              <DialogContent>
                <UserList users={[]} title="Followers" />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <Users className="w-4 h-4 mr-2 fill-zinc-700" />
                  {userProfile?.following.toLocaleString()} Following
                </Button>
              </DialogTrigger>
              <DialogContent>
                <UserList users={[]} title="Following" />
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">
                {userProfile?.posts.toLocaleString()}
              </p>
              <p className="text-muted-foreground">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{121}</p>
              <p className="text-muted-foreground">Likes</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {userProfile?.comments.toLocaleString()}
              </p>
              <p className="text-muted-foreground">Comments</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog open={isEditingCover} onOpenChange={setIsEditingCover}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Cover Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input type="file" accept="image/*" />
            <Button onClick={handleCoverImageUpdate}>Update Cover Image</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withAuth(ProfilePage);
