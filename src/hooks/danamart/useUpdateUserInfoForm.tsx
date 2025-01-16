import { updateUserInfo } from "@/repository/danamart/danamart.repository";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

interface UserInfoFormData {
  pernyataantrigger: string;
  pernyataan: number;
  dm_penmit_01010: string;
  dm_penmit_01003: string;
  dm_penmit_01006: string;
  dm_penmit_01007: string;
  dm_penmit_01015: string;
  dm_penmit_01027: string;
  dm_penmit_01026: string;
  namaPasangan: string;
  dm_penmit_01029: string;
  dm_penmit_01039: string;
  dm_penmit_01040: string;
  alamat_tmpt_kerja: string;
  telepon_tmpt_kerja: string;
  dm_penmit_01032: string;
  dm_penmit_01019rt: string;
  dm_penmit_01019rw: string;
  dm_penmit_01037: string;
  dm_penmit_01036: string;
  dm_penmit_01034: string;
  dm_penmit_01033: string;
  dm_penmit_01017: string;
  masa_berlaku: string;
  dm_penmit_01018: string;
  dm_penmit_01022: string;
  dm_penmit_01041: string;
  dm_penmit_01042: string;
  dm_pen_08002: string;
  dm_pen_08009: string;
  pernyataan_npwp: number;
  dm_penmit_01012: string;
  dm_penmit_01045: string;
  dm_penmit_01013_exist: string;
  dm_penmit_01008: string;
}

const schema = yup.object().shape({
  pernyataantrigger: yup.string().required("This field is required"),
  pernyataan: yup.number().required("This field is required"),
  dm_penmit_01010: yup.string().required("This field is required"),
  dm_penmit_01003: yup.string().required("This field is required"),
  dm_penmit_01006: yup.string().required("This field is required"),
  dm_penmit_01007: yup.string().required("This field is required"),
  dm_penmit_01015: yup.string().required("This field is required"),
  dm_penmit_01027: yup.string().required("This field is required"),
  dm_penmit_01026: yup.string().required("This field is required"),
  namaPasangan: yup.string().required("This field is required"),
  dm_penmit_01029: yup.string().required("This field is required"),
  dm_penmit_01039: yup.string().required("This field is required"),
  dm_penmit_01040: yup.string().required("This field is required"),
  alamat_tmpt_kerja: yup.string().required("This field is required"),
  telepon_tmpt_kerja: yup.string().required("This field is required"),
  dm_penmit_01032: yup.string().required("This field is required"),
  dm_penmit_01019rt: yup.string().required("This field is required"),
  dm_penmit_01019rw: yup.string().required("This field is required"),
  dm_penmit_01037: yup.string().required("This field is required"),
  dm_penmit_01036: yup.string().required("This field is required"),
  dm_penmit_01034: yup.string().required("This field is required"),
  dm_penmit_01033: yup.string().required("This field is required"),
  dm_penmit_01017: yup.string().required("This field is required"),
  masa_berlaku: yup.string().required("This field is required"),
  dm_penmit_01018: yup.string().required("This field is required"),
  dm_penmit_01022: yup.string().required("This field is required"),
  dm_penmit_01041: yup.string().required("This field is required"),
  dm_penmit_01042: yup.string().required("This field is required"),
  dm_pen_08002: yup.string().required("This field is required"),
  dm_pen_08009: yup.string().required("This field is required"),
  pernyataan_npwp: yup.number().required("This field is required"),
  dm_penmit_01012: yup.string().required("This field is required"),
  dm_penmit_01045: yup.string().required("This field is required"),
  dm_penmit_01013_exist: yup.string().required("This field is required"),
  dm_penmit_01008: yup.string().required("This field is required"),
});

	const defaultValues = {
    pernyataantrigger: "",
    pernyataan: 1,
    dm_penmit_01010: "",
    dm_penmit_01003: "",
    dm_penmit_01006: "",
    dm_penmit_01007: "",
    dm_penmit_01015: "",
    dm_penmit_01027: "",
    dm_penmit_01026: "",
    namaPasangan: "",
    dm_penmit_01029: "",
    dm_penmit_01039: "",
    dm_penmit_01040: "",
    alamat_tmpt_kerja: "",
    telepon_tmpt_kerja: "",
    dm_penmit_01032: "",
    dm_penmit_01019rt: "",
    dm_penmit_01019rw: "",
    dm_penmit_01037: "",
    dm_penmit_01036: "",
    dm_penmit_01034: "",
    dm_penmit_01033: "",
    dm_penmit_01017: "",
    masa_berlaku: "",
    dm_penmit_01018: "",
    dm_penmit_01022: "",
    dm_penmit_01041: "",
    dm_penmit_01042: "",
    dm_pen_08002: "",
    dm_pen_08009: "",
    pernyataan_npwp: 1,
    dm_penmit_01012: "",
    dm_penmit_01045: "",
    dm_penmit_01013_exist: "",
    dm_penmit_01008: "",
	}

const useUpdateUserInfoForm = (): any => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
    setValue,
    trigger,
    watch,
  } = useForm<UserInfoFormData>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
		defaultValues
  });

	// const onSubmit = async (data: UserInfoFormData): Promise<void> => {
  //   const formData = new FormData();
  //   Object.entries(data).forEach(([key, value]) => {
  //       formData.append(key, value);
  //   });

  //   try {
	// 		await updateUserInfo(formData);
	// 		toast.success("User information updated successfully");
	// 		reset();
  //   } catch (error) {
	// 		console.error(error);
	// 		toast.error("Failed to update user information");
  //   }
	// };

	// const onSubmit = async (data: UserInfoFormData): Promise<void> => {
	// 	try {
	// 		await updateUserInfo(data);
	// 		toast.success("User information updated successfully");
	// 		reset();
	// 	} catch (error) {
	// 		console.error(error);
	// 		toast.error("Failed to update user information");
	// 	}
	// };

  // const onSubmit = async (data: UserInfoFormData): Promise<void> => {
  //   const formData = new FormData();
  //   Object.entries(data).forEach(([key, value]) => {
  //     formData.append(key, value);
  //   });

  //   const formObject: UserInfoFormData = Object.fromEntries(formData.entries()) as UserInfoFormData;

  //   try {
  //     await updateUserInfo(formObject);
  //     toast.success("User information updated successfully");
  //     reset();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to update user information");
  //   }
  // };

  const onSubmit = async (data: UserInfoFormData): Promise<void> => {
    try {
      await updateUserInfo(data);
      toast.success("User information updated successfully");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user information");
    }
  };

  return {
    handleSubmit,
    register,
    errors,
    control,
    setValue,
    trigger,
    watch,
    onSubmit,
  };
};

export default useUpdateUserInfoForm;
