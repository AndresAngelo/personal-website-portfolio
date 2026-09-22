export interface SortableProject {
  pinned?: boolean;
}

/**
 * Places pinned projects first without changing the order within either group.
 */
export function sortPinnedProjects<T extends SortableProject>(projects: readonly T[]): T[] {
  const pinned = projects.filter((project) => project.pinned === true);
  const unpinned = projects.filter((project) => project.pinned !== true);

  return [...pinned, ...unpinned];
}
