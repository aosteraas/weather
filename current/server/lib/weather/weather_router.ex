defmodule Weather.Router do
  use Plug.Router
  use Plug.Debugger
  require Logger
  plug(Plug.Logger, log: :debug)
  plug(:match)
  plug(:dispatch)
  # routes
  get "/hello" do
    send_resp(conn, 200, "World")
  end

  post "/post" do
    {:ok, body, conn} = read_body(conn)
    body = Poison.decode!(body)

    latitude = body["lat"]
    longitude = body["lat"]
    body = Weather.Darksky.getWeather(latitude, longitude)
    send_resp(conn, 200, body)
  end

  match _ do
    send_resp(conn, 404, "not found")
  end
end
