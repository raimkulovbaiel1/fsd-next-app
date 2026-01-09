import { User } from '../types/user';

interface UserCardProps {
  user: User;
  onClick?: () => void;
}

export const UserCard = ({ user, onClick }: UserCardProps) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      {user.avatar && (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full mx-auto mb-4"
        />
      )}
      <h3 className="text-lg font-semibold text-center">{user.name}</h3>
      <p className="text-gray-600 text-center">{user.email}</p>
    </div>
  );
};

