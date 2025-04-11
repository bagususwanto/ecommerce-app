import * as React from "react";
import { TextInput, View, type TextInputProps } from "react-native";
import { cn } from "~/lib/utils";
import { CircleX, LucideIcon } from "lucide-react-native";
import IconButton from "../IconButton";
import { useSearch } from "~/context/SearchContext";
import { useRouter } from "expo-router";

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps & {
    icon?: LucideIcon;
    className?: string; // Hanya untuk View
    inputClassName?: string; // Khusus untuk TextInput
  }
>(
  (
    { className, inputClassName, placeholderClassName, icon: Icon, ...props },
    ref
  ) => {
    const { searchTerm, setSearchTerm } = useSearch();
    const router = useRouter();
    return (
      <View
        className={cn(
          "flex-row items-center bg-background rounded-md px-3",
          className
        )}>
        {Icon && <Icon size={16} color="gray" className="mr-2" />}
        <TextInput
          ref={ref}
          className={cn(
            "web:flex flex-1 h-10 web:w-full px-3 py-1 web:py-2 text-base native:leading-[1.25] web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
            props.editable === false && "opacity-50 web:cursor-not-allowed",
            inputClassName // Menggunakan prop khusus untuk TextInput
          )}
          placeholderClassName={cn(
            "text-muted-foreground",
            placeholderClassName
          )}
          {...props}
        />
        {searchTerm && (
          <IconButton
            icon={CircleX}
            size={16}
            color="white"
            fill={"gray"}
            onPress={() => {
              setSearchTerm("");
              router.push("/search");
            }}
          />
        )}
      </View>
    );
  }
);

Input.displayName = "Input";

export { Input };
