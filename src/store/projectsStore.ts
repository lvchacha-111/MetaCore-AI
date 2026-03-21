import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Project } from '@/types/project'

interface ProjectsState {
  projects: Project[]
  currentProjectId: string | null
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  setCurrentProject: (id: string) => void
  getCurrentProject: () => Project | null
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set, get) => ({
      projects: [],
      currentProjectId: null,

      addProject: (project) =>
        set((s) => ({
          projects: [...s.projects, project],
          currentProjectId: project.id
        })),

      updateProject: (id, updates) =>
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: Date.now() } : p
          )
        })),

      deleteProject: (id) =>
        set((s) => ({
          projects: s.projects.filter((p) => p.id !== id),
          currentProjectId: s.currentProjectId === id ? null : s.currentProjectId
        })),

      setCurrentProject: (id) => set({ currentProjectId: id }),

      getCurrentProject: () => {
        const { projects, currentProjectId } = get()
        return projects.find((p) => p.id === currentProjectId) ?? null
      }
    }),
    { name: 'metacore-projects' }
  )
)
