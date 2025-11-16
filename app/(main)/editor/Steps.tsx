import { EditorForProps } from "@/lib/type"
import GeneralInforForms from "./forms/GeneralInforForms"
import PersonalInfoForm from "./forms/PersonalInfoForm"
import WorkExpereinceFrom from "./forms/WorkExpereinceFrom"
import EducationalForm from "./forms/EducationalForm"
import SkillForm from "./forms/SkillForm"
import SummaryForm from "./forms/SummaryForm"

export const steps:{
    title : string
    component : React.ComponentType<EditorForProps>
    key: string
    }[] = [
        {title : 'General Info', component: GeneralInforForms, key:"general-info"},
        {title : 'Personal Info', component: PersonalInfoForm, key:"personal-info"},
        {title : 'Work Expereince', component: WorkExpereinceFrom, key:"work-experience"},
        {title : 'Education', component: EducationalForm, key:"educational-info"},
        {title : 'Skills', component: SkillForm, key:"skill-info"},
        {title : 'Summary', component: SummaryForm, key:"summary"},
    ]