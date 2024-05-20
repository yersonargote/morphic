import { getChats } from '@/lib/actions/chat'
import { Chat } from '@/lib/types'
import { cache } from 'react'
import { ClearHistory } from './clear-history'
import HistoryItem from './history-item'

type HistoryListProps = {
  userId?: string
}

const loadChats = cache(async (userId?: string) => {
  return await getChats(userId)
})

// Start of Selection
export async function HistoryList({ userId }: HistoryListProps) {
  const chats = await loadChats(userId)

  return (
    <div className="flex flex-col flex-1 space-y-3 h-full">
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {!chats?.length ? (
          <div className="text-foreground/30 text-sm text-center py-4">
            No search history
          </div>
        ) : (
          chats?.map(
            (chat: Chat) => chat && <HistoryItem key={chat.id} chat={chat} />
          )
        )}
      </div>
      <div className="mt-auto">
        <ClearHistory empty={!chats?.length} />
      </div>
    </div>
  )
}
