import BackNav from '@/assets/circle-page/back_nav.svg';
import MoreButton from '@/assets/more-option/more_vertical.svg';
import AddGroupMembers from '@/components/chat/AddGroupMembers';
import SearchGroupMembers from '@/components/chat/SearchGroupMembers';
import ModalShareGroup from '@/components/popup/ModalShareGroup';
import PageGradient from '@/components/ui/page-gradient/PageGradient';
import withAuth from '@/helpers/withAuth';
import { getGroupDetail, getGroupMember } from '@/repository/chat.repository';
import { useAppSelector } from '@/store/redux/store';
import {
  type GroupMemberData,
  type GroupMemberResponse,
  type IGroupChatDetail,
  type UpdateGroupForm
} from '@/utils/interfaces/chat.interface';
import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography
} from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuSearch } from 'react-icons/lu';
import { MdOutlineGroupAdd } from 'react-icons/md';
import { RiLink } from 'react-icons/ri';
import { toast } from 'react-toastify';
import DefaultAvatar from '../../../../public/assets/chat/default-avatar.svg';
import EditButton from '../../../../public/assets/chat/edit-icon.svg';
import LeaveButton from '../../../../public/assets/chat/logout-icon.svg';
import NotifOffButton from '../../../../public/assets/chat/notification-off-icon.svg';

const DetailGroup: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const { dataUser } = useAppSelector(state => state.user);
  const [detailGroup, setDetailGroup] = useState<IGroupChatDetail>();
  const [groupMembers, setGroupMembers] = useState<GroupMemberResponse>();
  const [isOpenSearchMembers, setIsOpenSearchMembers] =
    useState<boolean>(false);
  const [isOpenAddMembers, setIsOpenAddMembers] = useState<boolean>(false);
  const [isShareModal, setIsShareModal] = useState<boolean>(false);
  const [updateGroupForm, setUpdateGroupForm] = useState<UpdateGroupForm>({
    avatar: '',
    name: '',
    description: '',
    privacy: '',
    hashtags: [],
    memberships: []
  });

  const fetchGroupDetail = async (): Promise<void> => {
    try {
      const groupDetail = await getGroupDetail(id as string);
      const groupMember = await getGroupMember(id as string);
      setDetailGroup(groupDetail);
      setUpdateGroupForm({
        avatar: groupDetail.avatar,
        name: groupDetail.name,
        description: groupDetail.description,
        privacy: groupDetail.privacy,
        hashtags: groupDetail.hashtags,
        memberships: groupMember.data.map(member => member.id)
      });
      setGroupMembers(groupMember);
    } catch (error: any) {
      toast.error('Failed to fetch Group Detail');
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      void fetchGroupDetail();
    }
  }, [id]);

  return (
    <PageGradient defaultGradient className="w-full">
      {isShareModal && (
        <ModalShareGroup
          onClose={() => {
            setIsShareModal(prev => !prev);
          }}
          url={id ?? ''}
          groupId={id ?? ''}
        />
      )}
      <div
        className={`w-full bg-white ${
          isOpenAddMembers || isOpenSearchMembers ? 'hidden' : 'block'
        }`}
      >
        <div className="w-full flex flex-col gap-3 shadow-lg md:px-8 px-5 py-4">
          <div className="flex justify-between items-center">
            <div
              onClick={async () => {
                await router.push(
                  `/chat?roomId=${id as string}&isGroupChat=true`
                );
              }}
            >
              <Image
                alt="Back"
                src={BackNav}
                className="h-6 w-6 object-cover cursor-pointer"
              />
            </div>
            <Menu placement="bottom-start">
              <MenuHandler>
                <Image
                  src={MoreButton}
                  alt="threeDots"
                  className="cursor-pointer"
                />
              </MenuHandler>
              <MenuList>
                <MenuItem className="font-poppins text-sm font-normal text-[#201B1C] flex items-center gap-2">
                  <Image src={EditButton} alt="edit" width={20} />
                  {t('chat.menuBar.changeGroupInfo')}
                </MenuItem>
                <MenuItem className="font-poppins text-sm font-normal text-[#201B1C] flex items-center gap-2">
                  <Image src={NotifOffButton} alt="notif" width={20} />
                  {t('chat.menuBar.mutedNotif')}
                </MenuItem>
                <MenuItem className="font-poppins text-sm font-normal text-[#B81516] flex items-center gap-2">
                  <Image src={LeaveButton} alt="logout" width={20} />
                  {t('chat.menuBar.leaveGroup')}
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className="flex justify-between items-center md:pl-4 py-5">
            <div className="grid grid-cols-[auto_1fr] gap-[18px] place-items-center">
              <Avatar
                src={
                  detailGroup?.avatar === ''
                    ? DefaultAvatar.src
                    : detailGroup?.avatar
                }
                alt="avatar"
                width={80}
                height={80}
                className="md:max-w-20 md:max-h-20 w-14 h-14"
              />
              <div className="flex flex-col">
                <Typography className="text-base font-semibold text-[#262626] font-poppins">
                  {detailGroup?.name}
                </Typography>
                <Typography className="text-sm text-[#262626] font-normal font-poppins">
                  {`${detailGroup?.total_memberships as number} ${t(
                    'chat.members'
                  )}`}
                </Typography>
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              {groupMembers?.data
                ?.filter(member => member?.user_id === dataUser?.id)
                .find(member => member?.role === 'admin') != null && (
                <div
                  onClick={() => {
                    setIsOpenAddMembers(prev => !prev);
                  }}
                  className="border border-[#1A857D] rounded-full md:w-12 md:h-12 w-10 h-10 flex justify-center items-center bg-[#dcfce4] hover:bg-[#b1e1c1] cursor-pointer duration-150"
                >
                  <MdOutlineGroupAdd
                    color="#1A857D"
                    size={24}
                    className="md:w-6 md:h-6 w-5 h-5"
                  />
                </div>
              )}
              <div
                onClick={async () => {
                  setIsShareModal(true);
                }}
                className="border border-[#1A857D] rounded-full md:w-12 md:h-12 w-10 h-10 flex justify-center items-center bg-[#dcfce4] hover:bg-[#b1e1c1] cursor-pointer duration-150"
              >
                <RiLink
                  color="#1A857D"
                  size={24}
                  className="md:w-6 md:h-6 w-5 h-5"
                />
              </div>
              <div className="border border-[#1A857D] rounded-full md:w-12 md:h-12 w-10 h-10 flex justify-center items-center bg-[#dcfce4] hover:bg-[#b1e1c1] cursor-pointer duration-150">
                {groupMembers?.data
                  ?.filter(member => member?.user_id === dataUser?.id)
                  .find(member => member?.role === 'admin') != null && (
                  <div
                    onClick={() => {
                      setIsOpenSearchMembers(prev => !prev);
                    }}
                    className="border border-[#1A857D] rounded-full md:w-12 md:h-12 w-10 h-10 flex justify-center items-center bg-[#dcfce4] hover:bg-[#b1e1c1] cursor-pointer duration-150"
                  >
                    <LuSearch
                      color="#1A857D"
                      size={24}
                      className="md:w-6 md:h-6 w-5 h-5"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col p-8 gap-8">
          <div className="w-full flex justify-between">
            {detailGroup?.description === '' ? (
              <Typography className="text-sm font-semibold text-[#1A857D] font-poppins cursor-pointer hover:underline">
                {t('chat.addGroupDescription')}
              </Typography>
            ) : (
              <div className="flex flex-col gap-2">
                <Typography className="text-sm font-semibold text-[#1A857D] font-poppins">
                  {t('chat.groupDescription')}
                </Typography>
                <Typography className="text-sm font-normal text-[#262626] font-poppins">
                  {detailGroup?.description}
                </Typography>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            {groupMembers?.data
              ?.sort((a, b) => {
                if (a?.role === 'admin' && b?.role !== 'admin') return -1;
                if (a?.role !== 'admin' && b?.role === 'admin') return 1;
                return 0;
              })
              ?.map((item: GroupMemberData, index: number) => (
                <div key={index}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-5">
                      <Avatar
                        src={item?.user_avatar}
                        alt="Avatar"
                        width={48}
                        height={48}
                        className="w-12 h-12"
                      />
                      <Typography className="text-md font-semibold text-[#262626] font-poppins">
                        {item?.user_name}
                      </Typography>
                    </div>
                    {item?.role === 'admin' && (
                      <Typography className="text-sm text-[#3AC4A0] font-normal font-poppins bg-[#EDFCD3] rounded-md p-2 w-fit">
                        Admin
                      </Typography>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <AddGroupMembers
        isOpenAddMembers={isOpenAddMembers}
        setIsOpenAddMembers={setIsOpenAddMembers}
        groupMembers={groupMembers?.data as GroupMemberData[]}
        groupId={id as string}
        updateGroupForm={updateGroupForm}
        setUpdateGroupForm={setUpdateGroupForm}
      />
      <SearchGroupMembers
        isOpenSearchMembers={isOpenSearchMembers}
        setIsOpenSearchMembers={setIsOpenSearchMembers}
        groupMembers={groupMembers?.data as GroupMemberData[]}
        groupId={id as string}
      />
    </PageGradient>
  );
};

export default withAuth(DetailGroup);
