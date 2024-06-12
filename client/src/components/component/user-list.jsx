import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserIcon, LayoutGridIcon, ListIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const UserList = ({ users }) => {
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return "U";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  const handleUserClick = (userUUID) => {
    router.push(`/dashboard/recursoshumanos/employed/attendance?userUUID=${userUUID}`);
  };

  const filteredUsers = users.filter(user => {
    const searchLower = search.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.dni.toLowerCase().includes(searchLower) ||
      user.uuid.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="w-full">
      <header className="flex items-center justify-between gap-4 p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <UserIcon className="w-6 h-6" />
          <h2 className="text-xl font-semibold hidden md:block">User Profiles</h2>
        </div>
        <div className="flex flex-1 items-center gap-2">
          <Input
            type="search"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs flex-1"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <LayoutGridIcon className="w-4 h-4" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setView("grid")}>
                <LayoutGridIcon className="w-4 h-4 mr-2" />
                Grid View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView("list")}>
                <ListIcon className="w-4 h-4 mr-2" />
                List View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="p-4 sm:p-6">
        {view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <Card 
                key={user.uuid} 
                className="max-w-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleUserClick(user.uuid)}
              >
                <CardContent className="flex flex-col items-center gap-4 p-4">
                  <Avatar className="w-20 h-20">
                    <img src={user.avatar || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                    <AvatarFallback>{getInitials(user.firstName, user.lastName)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="font-semibold">{`${user.firstName} ${user.lastName}`}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.dni}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredUsers.map((user) => (
              <Card 
                key={user.uuid} 
                className="flex gap-4 hover:shadow-lg transition-shadow duration-300 p-3 cursor-pointer"
                onClick={() => handleUserClick(user.uuid)}
              >
                <Avatar className="w-16 h-16 shrink-0">
                  <img src={user.avatar || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback>{getInitials(user.firstName, user.lastName)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{`${user.firstName} ${user.lastName}`}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.dni}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserList;
