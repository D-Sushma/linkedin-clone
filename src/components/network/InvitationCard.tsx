import { User } from '@/types';
import Avatar from '../common/Avatar';
import Button from '../common/Button';

interface InvitationCardProps {
  user: User;
  onAccept: () => void;
  onIgnore: () => void;
}

export default function InvitationCard({ user, onAccept, onIgnore }: InvitationCardProps) {
  return (
    <div className="border-b border-gray-200 p-4 last:border-b-0">
      <div className="flex items-start gap-4">
        <Avatar user={user} size="lg" className="flex-shrink-0" />
        <div className="flex items-center justify-between w-full min-w-0">
          <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">{user.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{user.title}</p>
          <p className="text-xs text-gray-500 mb-3">{user.location}</p>
          </div>
          <div className="flex gap-2 items-center flex-nowrap">
            <Button variant="outline" size="sm" onClick={onIgnore} className="whitespace-nowrap">
              Ignore
            </Button>
            <Button variant="primary" size="sm" onClick={onAccept} className="whitespace-nowrap">
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

