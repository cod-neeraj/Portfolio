export interface Certificate {
  name: string;
  instituteName: string;
  date: string;
  imageUrl: string;
}

export const certificateData: Certificate[] = [
    {
        name: "Devops Engineering",
        instituteName: "GeeksforGeeks",
        date: "October 2025",
        imageUrl: "https://d3dfns3fhvmx5g.cloudfront.net/229cd75fe4fb3dac595f3aa756330982.pdf"
    },
    {
        name: "Backend Development",
        instituteName: "GeeksforGeeks",
        date: "December 2024",
        imageUrl: "https://d3dfns3fhvmx5g.cloudfront.net/3a1175e13d94b93b3bcfb99db534da50.pdf"
    },
    {
        name: "Certified Kubernetes Administrator (CKA)",
        instituteName: "KodeKloud",
        date: "January 2025",
        imageUrl: "https://d3dfns3fhvmx5g.cloudfront.net/cka.png"
    }
]
