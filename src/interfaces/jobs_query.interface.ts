import ftstatus from "../constants/fulltime";

export default interface JobQuery {
  description: string;
  location: string;
  is_fulltime: ftstatus;
  page: number;
}
