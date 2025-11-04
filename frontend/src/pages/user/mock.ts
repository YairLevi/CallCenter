import type { Call } from "@/api/types"

export enum Status {
  Open = "Open",
  InProgress = "In Progress",
  Completed = "Completed",
}

export const dummyCalls: Call[] = [
  {
    id: "call-1",
    name: "Client Onboarding - Acme Corp",
    tags: [
      { id: "tag-1", name: "High Priority" },
      { id: "tag-2", name: "Enterprise" },
      { id: "tag-3", name: "Q4 Goal" },
    ],
    tasks: [
      { id: "task-1", name: "Send welcome email", status: Status.Completed },
      { id: "task-2", name: "Schedule kickoff meeting", status: Status.Completed },
      { id: "task-3", name: "Review contract", status: Status.InProgress },
      { id: "task-4", name: "Set up project in CRM", status: Status.Open },
      { id: "task-5", name: "Set up project in CRM 1", status: Status.Open },
      { id: "task-6", name: "Set up project in CRM 2", status: Status.Open },
      { id: "task-7", name: "Set up project in CRM 3", status: Status.Open },
    ],
  },
  {
    id: "call-2",
    name: "Support Ticket #4421 - Login Issue",
    tags: [
      { id: "tag-4", name: "Bug" },
      { id: "tag-5", name: "Urgent" },
    ],
    tasks: [
      { id: "task-5", name: "Reproduce issue", status: Status.Completed },
      { id: "task-6", name: "Check server logs", status: Status.Completed },
      { id: "task-7", name: "Apply hotfix", status: Status.InProgress },
      { id: "task-8", name: "Notify user", status: Status.Open },
    ],
  },
  {
    id: "call-3",
    name: "Sales Demo - StartupXYZ",
    tags: [
      { id: "tag-6", name: "Sales" },
      { id: "tag-7", name: "Demo" },
    ],
    tasks: [
      { id: "task-9", name: "Prepare demo environment", status: Status.Completed },
      { id: "task-10", name: "Send calendar invite", status: Status.Completed },
      { id: "task-11", name: "Follow up after demo", status: Status.Open },
    ],
  },
  {
    id: "call-4",
    name: "Internal Sync - Team Retro",
    tags: [
      { id: "tag-8", name: "Internal" },
      { id: "tag-9", name: "Team" },
    ],
    tasks: [
      { id: "task-12", name: "Share agenda", status: Status.Completed },
      { id: "task-13", name: "Collect feedback", status: Status.Open },
      { id: "task-14", name: "Update OKRs", status: Status.Open },
    ],
  },
  {
    id: "call-5",
    name: "Feature Request - Bulk Export",
    tags: [
      { id: "tag-10", name: "Feature Request" },
      { id: "tag-11", name: "Product" },
    ],
    tasks: [
      { id: "task-15", name: "Document use case", status: Status.Completed },
      { id: "task-16", name: "Prioritize in backlog", status: Status.InProgress },
      { id: "task-17", name: "Design mockup", status: Status.Open },
    ],
  },
]
