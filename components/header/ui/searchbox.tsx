import { Search } from "lucide-react-native";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

interface SearchBoxProps {
  placeholder: string;
  className?: string;
}

export function SearchBox({ placeholder, className }: SearchBoxProps) {
  const [search, setSearch] = useState("");

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <Input
      className={cn("", className)}
      placeholder={placeholder}
      returnKeyType="search"
      value={search}
      onChangeText={handleSearch}
      aria-labelledby="inputLabel"
      aria-errormessage="inputError"
      icon={Search}
    />
  );
}
