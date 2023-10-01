import { Dialog } from "@headlessui/react";
import { Button } from "~/components/generic/Button";
import { useContext, useState } from "react";
import FormInput from "~/components/generic/FormInput";
import FormSelect from "~/components/generic/FormSelect";
import { CalendarContext } from "~/components/calendar/Calendar";
import { Post } from "~/models/Post";
import { createPosts } from "~/api/api";

// Define the shape of a select option
interface SelectOption {
  name: string;
  value: string;
}

// Predefined network options
const networks: SelectOption[] = [
  { name: "LinkedIn", value: "linkedin" },
  { name: "Twitter", value: "twitter" },
  { name: "Facebook", value: "facebook" },
  { name: "Instagram", value: "instagram" },
  { name: "YouTube", value: "youtube" },
];

// Predefined day options
const days: SelectOption[] = new Array(30).fill(0).map((_, index) => {
  return {
    name: `${index + 1} day${index > 0 ? "s" : ""}`,
    value: `${index + 1}`,
  };
});

export default function PostsAddForm() {
  // Use the CalendarContext for state management
  const calendarContext = useContext(CalendarContext);

  // Local component state
  const [selectedNetwork, setSelectedNetwork] = useState<SelectOption>(
    networks[0]
  );
  const [selectedDays, setSelectedDays] = useState<SelectOption>(days[0]);
  const [topic, setTopic] = useState<string>("");

  // Function to handle the Add button click event
  const onAddButtonClick = async () => {
    calendarContext.setLoading(true);
    try {
      const posts = await createPosts({
        topic: topic,
        network: selectedNetwork.value,
        days: Number(selectedDays.value),
      });

      calendarContext.setPosts(posts);
      calendarContext.setPostsAddFormOpen(false);
    } catch (err) {
      console.error(err);
    }

    calendarContext.setLoading(false);
  };

  return (
    <Dialog open={true} onClose={() => {}} className="relative z-10 max-w-3xl">
      <div className="fixed inset-0 bg-black/5 backdrop-blur-sm" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <Dialog.Panel className="mx-auto max-w-5xl rounded bg-gray-50 p-4 relative flex flex-col gap-3.5">
            <Dialog.Title>Generate Posts</Dialog.Title>
            <span className="text-xs text-gray-500 w-80">
              This form facilitates the automated creation and scheduling of a
              specified quantity of daily posts, tailored to a designated topic
              and intended for a specific social media platform.
            </span>
            <div className="p-5 bg-white rounded-md grid grid-cols-1 gap-3.5 shadow">
              {/* Network selection */}
              <FormSelect
                data={networks}
                value={selectedNetwork}
                label="Network"
                displayMember="name"
                onChange={(selectedValue) => {
                  if (Array.isArray(selectedValue)) return;
                  setSelectedNetwork(selectedValue);
                }}
              />
              {/* Topic input */}
              <FormInput value={topic} label="Topic" onChange={setTopic} />
              {/* Number of days selection */}
              <FormSelect
                data={days}
                value={selectedDays}
                label="Number of days"
                displayMember="name"
                onChange={(selectedValue) => {
                  if (Array.isArray(selectedValue)) return;
                  setSelectedDays(selectedValue);
                }}
              />
            </div>
            <div className="flex flex-row gap-3.5">
              <Button
                className="flex-grow basis-0.5"
                color="white"
                onClick={() => {
                  calendarContext.setPostsAddFormOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="flex-grow basis-0.5"
                onClick={onAddButtonClick}
              >
                Add
              </Button>
            </div>
            {/* Close button */}
            <span
              className="material-symbols-outlined cursor-pointer select-none absolute top-1.5 right-1.5"
              onClick={() => {
                calendarContext.setPostsAddFormOpen(false);
              }}
            >
              close
            </span>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
