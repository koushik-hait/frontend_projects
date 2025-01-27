"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CalendarIcon, CircleX } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { expressApi } from "@/lib/axios-conf";
import { useQuery } from "@tanstack/react-query";

type Props = {
  filter: {
    status: string;
    tag: string;
    category: string;
    author: string;
    deleted: boolean;
    publishedAt: {
      from: string;
      to: string;
    };
    page: number;
    limit: number;
    sortBy: string;
    sortDirection: string;
  };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      status: string;
      tag: string;
      category: string;
      author: string;
      deleted: boolean;
      publishedAt: {
        from: string;
        to: string;
      };
      page: number;
      limit: number;
      sortBy: string;
      sortDirection: string;
    }>
  >;
};

const getTags = async () => {
  const { data } = await expressApi.get(`/blog/admin/tag/all`);
  return data.data;
};

const getCategories = async () => {
  const { data } = await expressApi.get(`/blog/admin/category/all`);
  return data.data;
};

export default function CustomFilter({ filter, setFilter }: Props) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isAscending, setIsAscending] = useState(true);

  const {
    data: categories,
    error: catError,
    isError: isCatError,
    isPending: isCatPending,
  } = useQuery({
    queryKey: ["admin-categories-all"],
    queryFn: async () => await getCategories(),
    staleTime: 1000 * 60 * 60 * 24 * 7,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });

  const {
    data: tags,
    error: tagError,
    isError: isTagError,
    isPending: isTagPending,
  } = useQuery({
    queryKey: ["admin-tags-all"],
    queryFn: async () => await getTags(),
    staleTime: 1000 * 60 * 60 * 24 * 7,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });

  // console.log(categories, tags);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handleSwitchChange = (checked: boolean) => {
    setIsAscending(checked);
  };

  const handleReset = () => {
    setDateRange(undefined);
    setFilter({
      ...filter,
      status: "",
      tag: "",
      category: "",
      author: "",
      publishedAt: {
        from: "",
        to: "",
      },
      sortDirection: "desc",
      page: 1,
      limit: 100,
      sortBy: "",
    });
  };

  const handleApply = () => {
    // Do something with the selected date range
    setFilter({
      ...filter,
      publishedAt: {
        from: dateRange?.from?.toISOString() || "",
        to: dateRange?.to?.toISOString() || "",
      },
      sortDirection: isAscending ? "asc" : "desc",
      page: 1,
      limit: 100,
      sortBy: "publishedAt",
    });
  };

  const handleCancel = () => {
    // Do something to cancel the filter
  };

  const handleTagChange = (tag: string) => {
    // Do something with the selected tag
    setFilter({ ...filter, tag });
  };

  const handleCategoryChange = (category: string) => {
    // Do something with the selected category
    setFilter({ ...filter, category });
  };

  const handleAuthorChange = (author: string) => {
    // Do something with the selected author
    setFilter({ ...filter, author });
  };

  const handleStatusChange = (status: string) => {
    // Do something with the selected status
    setFilter({ ...filter, status });
  };

  const handleSearch = (q: string) => {
    // Do something with the search query
  };

  const handleClearSearch = () => {
    // Do something to clear the search query
  };

  if (isCatPending || isTagPending) {
    return <div>Loading...</div>;
  }

  if (isCatError || isTagError) {
    return <div>Error fetching data</div>;
  }

  if (!categories || !tags) {
    return <div>No data</div>;
  }

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg shadow md:w-1/2 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Filter Blog Posts</h2>

      <div className="grid gap-4 grid-cols-2">
        <div className="col-span-1">
          <Input
            type="text"
            placeholder="Search posts..."
            className="w-full"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <CircleX />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Select onValueChange={handleTagChange} defaultValue={filter.tag}>
          <SelectTrigger>
            <SelectValue placeholder="Select tag" />
          </SelectTrigger>
          <SelectContent>
            {tags.map((tag: string) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={handleCategoryChange}
          defaultValue={filter.category}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category: { _id: string; name: string }) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="col-span-1">
          <Label htmlFor="search">Search By Author Name </Label>
          <Input
            onChange={(e) => handleAuthorChange(e.target.value)}
            type="text"
            placeholder="Search Author..."
          />
        </div>

        <Select onValueChange={handleStatusChange} defaultValue={filter.status}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="ARCHIVED">Archived</SelectItem>
            <SelectItem value="SCHEDULED">Scheduled</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Created Date</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="author">Author</SelectItem>
            <SelectItem value="views">Views</SelectItem>
            <SelectItem value="comments">Comments</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Switch
            id="ascending"
            checked={isAscending}
            onCheckedChange={setIsAscending}
          />
          <Label htmlFor="ascending">
            {isAscending ? "Ascending" : "Descending"}
          </Label>
        </div>
      </div>

      <Button type="button" onClick={handleReset} className="w-full sm:w-auto">
        Reset
      </Button>

      <Button type="button" onClick={handleApply} className="w-full sm:w-auto">
        Apply Filters
      </Button>
    </div>
  );
}
