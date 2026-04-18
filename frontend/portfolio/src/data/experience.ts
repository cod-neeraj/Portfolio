export interface ExperienceItem {
  id: number;
  jobRole: string;
  company: string;
  time: string;
  experience: string[];
}

export const experienceData: ExperienceItem[] = [
    {
        id: 1,
        jobRole: "Frontend WebDeveloper Intern",
        company: "TOTLE",
        time: "June 2024 - August 2024",
        experience: [
            "Developed and maintained web applications using React and Node.js.",
            "Collaborated with team members to implement new features and fix bugs.",
            "Participated in code reviews and provided feedback to improve code quality."
        ]

    }



]

